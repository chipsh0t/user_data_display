import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  
  private baseURL:string = 'https://random-data-api.com/api/v2/users';

  constructor(private httpClient:HttpClient) { }

  getUserData(): Observable<IUser>{
    const URL:string = `${this.baseURL}?size=10`;
    return this.httpClient.get<IUser>(URL); 
  }
}

