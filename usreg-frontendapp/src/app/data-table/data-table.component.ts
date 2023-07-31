import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter, ElementRef, } from '@angular/core';
import { IUser } from '../models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
//importing services
import { UserDataService } from '../services/user-data.service';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit, OnDestroy {
  public dataSource: MatTableDataSource<IUser>;
  displayedColumns: string[] = ['email', 'firstName', 'lastName', 'roles', 'status', 'delete'];
  roleOptions: string[];
  private dataArr: IUser[];
  private subs = new Subscription();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filteringInput', { static: true }) filter_val!: ElementRef<HTMLInputElement>;

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
      }
    ));

    //user added
    this.subs.add(this._userDataService.save_user_subject.subscribe(
      (new_user) => {
        //pushing new val to data arr
        const current_filtering: string = this.filter_val.nativeElement.value;
        if (this._newUserInFilter(current_filtering, new_user)) {
          this.dataArr.push(new_user);
          this.dataSource.data = [...this.dataArr];
        }
      }
    ));


    //user edit
    this.subs.add(this._userDataService.edit_user_subject.subscribe(
      (edited_user) => {
        let existing_user_index: number = this.dataArr.findIndex((u: IUser) => u.id === edited_user.id);
        this.dataArr[existing_user_index] = edited_user;
        this.dataSource.data = [...this.dataArr];
      }
    ));
  }


  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //filter users
    this.subs.add(this._userDataService.filteredUserData(filterValue).subscribe(
      (filtered_users) => {
        this.dataArr = filtered_users;
        this.dataSource.data = [...this.dataArr];
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
    ));
  }

  private _newUserInFilter(filter: string, new_user: IUser): boolean {
    let normailzed_filter:string = filter.trim().toLowerCase();
    return  new_user.firstName.toLowerCase().includes(normailzed_filter)||
            new_user.lastName.toLowerCase().includes(normailzed_filter)||
            new_user.email.toLowerCase().includes(normailzed_filter)||
            new_user.status.toLowerCase()===normailzed_filter||
            new_user.roles.some(role => role.toLowerCase().includes(normailzed_filter));
  }


  openDialog(user: IUser) {
    let dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: user
    });

    //wait for dialog close
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subs.add(this._userDataService.removeUser(user.id).subscribe(
          () => {
            //after removing user
            this.dataArr = this.dataArr.filter((u: IUser) => u.id !== user.id);
            this.dataSource.data = [...this.dataArr];
          }
        ));
      }
    });
  }


  onRowClick(row: IUser, event: any) {
    const is_delete_button_clicked = (event.target as HTMLElement).classList.contains('mat-mdc-button-touch-target');
    if (!is_delete_button_clicked) {
      //open edit form if click target is not delete button
      this.form_opened.emit(true);
      this.user_to_edit.emit(row);
    }
  }
}
