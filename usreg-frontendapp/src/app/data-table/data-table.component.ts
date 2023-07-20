import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter, } from '@angular/core';
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
// import { PaginationService } from '../services/pagination.service';
// import { LiveAnnouncer } from '@angular/cdk/a11y';


const rolesOptions: string[] = ['Administrator', 'User', 'Mainuser'];
const statusOptions: string[] = ['Active', 'Inactive'];
let nextId = 1;

function generateUniqueId(): number {
  return nextId++;
}

function generateRandomUser(): IUser {
  const firstNames: string[] = ['John', 'Jane', 'Alice', 'Bob', 'Michael', 'Laura'];
  const lastNames: string[] = ['Smith', 'Doe', 'Johnson', 'Williams', 'Brown', 'Miller'];

  const randomFirstName: string = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName: string = lastNames[Math.floor(Math.random() * lastNames.length)];
  const randomEmail: string = `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}@example.com`;

  const randomRolesCount: number = Math.floor(Math.random() * rolesOptions.length) + 1;
  const randomRoles: string[] = [];
  while (randomRoles.length < randomRolesCount) {
    const randomRole: string = rolesOptions[Math.floor(Math.random() * rolesOptions.length)];
    if (!randomRoles.includes(randomRole)) {
      randomRoles.push(randomRole);
    }
  }

  const randomStatus: string = statusOptions[Math.floor(Math.random() * statusOptions.length)];

  return {
    id: generateUniqueId(),
    first_name: randomFirstName,
    last_name: randomLastName,
    email: randomEmail,
    roles: randomRoles,
    status: randomStatus,
  };
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit, OnDestroy, AfterViewInit {

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'delete'];
  // dataSource =  new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // clickedRows = new Set<PeriodicElement>();
  // dataSource = ELEMENT_DATA;
  public dataSource: any;
  // displayedColumns: string[] = ['email', 'first_name', 'last_name', 'social_insurance_number', 'phone_number', 'delete'];
  displayedColumns: string[] = ['email', 'first_name', 'last_name', 'roles', 'status', 'delete'];
  // private dataArr: any;
  //MOCK DATA IMPLEMENTATION !!!!!
  //MOCK DATA IMPLEMENTATION END !!!!!
  private subs = new Subscription();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() form_opened = new EventEmitter<boolean>();
  //user data to be sent to edit form 
  @Output() user_to_edit = new EventEmitter<IUser>();
  // private paginationService:PaginationService
  // public getUsersFromServices(){
  //   let p = this.service.getUsers();
  // }

  constructor(private _userDataService: UserDataService, public dialog: MatDialog) {
    const USER_DATA: IUser[] = Array.from({ length: 30 }, generateRandomUser);
    this.dataSource = new MatTableDataSource<IUser>(USER_DATA);
  }

  ngOnInit(): void {
    // this.subs.add(this._userDataService.getUserData().subscribe((result) => {
    //   this.dataArr = result;
    //   this.dataSource = new MatTableDataSource<IUser>(this.dataArr);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // },
    //   (err: HttpErrorResponse) => { console.log(err) })
    // )
  }

  ngAfterViewInit() {
    //mock data usage
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
      if (result) {
        console.log(`user: ${user.first_name}, ${user.id} being deleted !`)
      } else {
        console.log(`user: ${user.first_name}, ${user.id} not deleted !`)
      }
    })
  }

  // onDeleteRequested(deletion_result: boolean, user:IUser) {
  // if (deletion_result) {

  //   console.log(`user: ${user.first_name}, ${user.id} being deleted !`)
  //   } else {

  //     console.log(`user: ${user.first_name}, ${user.id} not deleted !`)
  //   }
  // }

  onRowClick(row: IUser, event:any) {
    // const target = event.target as HTMLElement
    const is_delete_button_clicked = (event.target as HTMLElement).classList.contains('mat-mdc-button-touch-target');
    if(!is_delete_button_clicked){
      //open edit form if click target is not delete button
      this.form_opened.emit(true)
      this.user_to_edit.emit(row)
    }
    // console.log(`logged from table: ${JSON.stringify(row)}`)
  }


  //mock data generation


}
