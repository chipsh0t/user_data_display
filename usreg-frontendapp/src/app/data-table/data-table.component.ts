import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter, Input, OnChanges, SimpleChanges, } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { IUser } from '../models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscriber, Subscription, interval, map, of, share, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
// import { DeleteUserDialogComponent } from
//importing services
import { UserDataService } from '../services/user-data.service';
// import { PaginationService } from '../services/pagination.service';
// import { LiveAnnouncer } from '@angular/cdk/a11y';


// const rolesOptions: string[] = ['Administrator', 'User', 'Mainuser'];
// const statusOptions: string[] = ['Active', 'Inactive'];

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit, OnDestroy {
  public dataSource: any;
  displayedColumns: string[] = ['email', 'firstName', 'lastName', 'roles', 'status', 'delete'];
  roleOptions: string[];
  private dataArr: IUser[];
  private subs = new Subscription();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // @Input() save_clicked:boolean;

  @Output() form_opened = new EventEmitter<boolean>();
  //user data to be sent to edit form 
  @Output() user_to_edit = new EventEmitter<IUser>();

  constructor(private _userDataService: UserDataService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.subs.add(this._userDataService.getUserData().subscribe(
      (value) => {
        this.dataArr = value;
        this.dataSource = new MatTableDataSource<IUser>(this.dataArr);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(value);
      }
    ))

    //user added
    this.subs.add(this._userDataService.save_user_subject.subscribe(
      (new_user) => {
        console.log(`here in table: ${JSON.stringify(new_user)}`);
        //pushing new val to data arr
        this.dataArr.push(new_user);
        this.dataSource.data = [...this.dataArr];
      }
    ))
    

    //user edit
    this.subs.add(this._userDataService.edit_user_subject.subscribe(
      (edited_user) => {
        console.log(`here in table: ${JSON.stringify(edited_user)}`);
        let existing_user_index:number = this.dataArr.findIndex((u:IUser)=>u.id === edited_user.id);
        this.dataArr[existing_user_index] = edited_user;
        this.dataSource.data = [...this.dataArr];
      }
    ));

    // this.subs.add(this._userDataService.getUserRoles().subscribe((result:string[])=>{
    //   this.roleOptions = result;
    //   console.log(this.roleOptions);
    // }))

    // this.subs.add(this._userDataService.getSingleUser(2).subscribe((result:IUser)=>{
    //   console.log(result);
    // }))
  }

  // ngAfterViewInit() {
  //   //mock data usage
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  // ngAfterViewInit(): void {
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(user: IUser) {
    let dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: user
    });

    //wait for dialog close
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`user: ${user.firstName}, ${user.id} being deleted !`)
        this.subs.add(this._userDataService.removeUser(user.id).subscribe(
          ()=>{
            //after removing user
            this.dataArr = this.dataArr.filter((u:IUser)=>u.id !== user.id);
            this.dataSource.data = [...this.dataArr];
            console.log('deleted');
          }
        ));
      }
    });
  }

  onRowClick(row: IUser, event: any) {
    // const target = event.target as HTMLElement
    const is_delete_button_clicked = (event.target as HTMLElement).classList.contains('mat-mdc-button-touch-target');
    if (!is_delete_button_clicked) {
      //open edit form if click target is not delete button
      this.form_opened.emit(true)
      this.user_to_edit.emit(row)
    }
    // console.log(`logged from table: ${JSON.stringify(row)}`)
  }
}
