import { Component, OnInit } from '@angular/core';

//importing services
import { PaginationService } from '../services/pagination.service';

@Component({
  selector: 'app-data-table-paginator',
  templateUrl: './data-table-paginator.component.html',
  styleUrls: ['./data-table-paginator.component.css']
})
export class DataTablePaginatorComponent{
  
  constructor(private paginationService:PaginationService){}

  // ngOnInit(): void {
  //   // this.length = this.paginationService.paginator_length;
    
  // }

}
