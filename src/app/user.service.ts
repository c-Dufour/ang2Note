import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserService {
  private usersUrl = 'api/users';

  constructor(private http: HttpClient) {
     
  }
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl);
  }

}
