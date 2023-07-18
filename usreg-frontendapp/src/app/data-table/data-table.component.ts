import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { IUser } from '../models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
// import { DeleteUserDialogComponent } from
//importing services
import { UserDataService } from '../services/user-data.service';
import { PaginationService } from '../services/pagination.service';
// import { LiveAnnouncer } from '@angular/cdk/a11y';



@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit, OnDestroy {

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'delete'];
  // dataSource =  new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // clickedRows = new Set<PeriodicElement>();
  // dataSource = ELEMENT_DATA;
  public dataSource: any;
  displayedColumns: string[] = ['email', 'first_name', 'last_name', 'social_insurance_number', 'phone_number', 'delete'];
  private dataArr: any;
  private subs = new Subscription();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // @Output() form_opened = new EventEmitter<boolean>();

  // private paginationService:PaginationService
  // public getUsersFromServices(){
  //   let p = this.service.getUsers();
  // }

  constructor(private _userDataService: UserDataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subs.add(this._userDataService.getUserData().subscribe((result) => {
      this.dataArr = result;
      this.dataSource = new MatTableDataSource<IUser>(this.dataArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      (err: HttpErrorResponse) => { console.log(err) })
    )
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe() }
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


  // showDeleteDialog(user:IUser){
  //   console.log(this)
  // }
  openDialog(user: IUser) {
    // console.log(`Would you like to delete ${user.first_name}, id:${user.id}`)
    let dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      // width:'400px',
      // height:'400px',
      data: user
    });

    //wait for dialog close
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`dialog result: ${result}`)
      if (result === 'Yes') {

        console.log(`user: ${user.first_name}, ${user.id} being deleted !`)
      } else if (result === 'No') {

        console.log(`user: ${user.first_name}, ${user.id} not deleted !`)
      }
    })
  }

}
