import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  
  private baseURL:string = 'http://localhost:5246/api/v2/User';

  constructor(private httpClient:HttpClient) { }

  getUserData(): Observable<IUser[]>{
    const URL:string = `${this.baseURL}/find`;
    return this.httpClient.get<IUser[]>(URL); 
  }

  filteredUserData(query:string):Observable<IUser[]>{
    const URL = `${this.baseURL}/find?seqrch_q=${query}`;
    return this.httpClient.get<IUser[]>(URL);
  }

  getUserRoles():Observable<string[]>{
    const URL:string = `${this.baseURL}/reference-data/find`;
    return this.httpClient.get<string[]>(URL);
  }

  getSingleUser(id:bigint):Observable<IUser>{
    const URL:string = `${this.baseURL}/find-one?id=${id}`;
    return this.httpClient.get<IUser>(URL);
  }

  removeUser(id:bigint){
    const URL:string = `${this.baseURL}/remove?id=${id}`;
    return this.httpClient.delete(URL);
  }

  addNewUser(user:IUser):Observable<IUser>{
    const URL:string = `${this.baseURL}/save`;
    return this.httpClient.post<IUser>(URL,user);
  }

  updateUser(user:IUser):Observable<IUser>{
    const URL:string = `${this.baseURL}/update`;
    return this.httpClient.put<IUser>(URL,user);
  }
  
}

