import { Inject, Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subject, Subscribable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PaginationService {

  // private paginatorSubject = new Subject<MatPaginator>;
  // paginator_length:Observable<number>;

  // constructor(@Inject(Number) private length:number) {
  //   this.paginator_length. = this.length;
  // }
}
