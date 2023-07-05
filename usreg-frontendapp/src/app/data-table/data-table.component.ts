import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { IUser } from '../models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
//importing services
import { UserDataService } from '../services/user-data.service';
import { PaginationService } from '../services/pagination.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];




@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent{
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'delete'];
  // dataSource =  new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  clickedRows = new Set<PeriodicElement>();
  dataSource = ELEMENT_DATA;
  // @ViewChild(MatPaginator)paginator: MatPaginator;

  // private paginationService:PaginationService
  // public getUsersFromServices(){
  //   let p = this.service.getUsers();
  // }
  // ngOnInit(): void {
  //   this.paginationService.paginator_length = ELEMENT_DATA.length;
  // }

  // ngAfterViewInit(): void {
  //   this.dataSource.paginator = this.paginator;
  // }
}
