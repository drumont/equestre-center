import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { baseUrl } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import {AbstractControl, ValidationErrors} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = baseUrl + 'users/login';
  private registerUrl = baseUrl + 'users/register';
  // private authResult;

  constructor(private http: HttpClient) { }

  login(email: string, password: string ): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(this.loginUrl, {email, password})
      .pipe(
        // catchError(this.handleError<User>('getHeroes', []))
        tap(
          res => {
            // this.authResult = res;
            localStorage.setItem('authResult', res.status);
            localStorage.setItem('authToken', res.result.token);
          } )
      );
  }

  public isAuthenticated(): Boolean {
    const authResult = localStorage.getItem('authResult');
    if (authResult === 'success') {
      return true;
    } else { return false; }
  }

  register( email: string, password: string, firstname: string, lastname: string, licence: string, phone: string) {
    return this.http.post<any>(this.registerUrl, {email, password, firstname, lastname, licence, phone})
      .pipe();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
