import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import {HttpClient,HttpHeaders} from '@angular/common/http';

import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class UserService {
  private usersUrl = 'api/users';

  constructor(private http: HttpClient) {
  }
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl);
  }
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }
  updateUser(user:User): Observable<any> {
    return this.http.put(this.usersUrl,user,httpOptions).pipe(
      tap(_ => console.log(`updated hero id=${user.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  };
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
   console.log(message);
  }

}
