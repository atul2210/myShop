import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse,HttpResponse,HttpParams } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from 'rxjs/observable';
import { catchError,retry } from 'rxjs/operators';
import { observableToBeFn } from 'rxjs/testing/TestScheduler';
import { BehaviorSubject, Subject } from 'rxjs/Rx';
import * as moment from "moment";
import { responseData } from '../../model/pagedata';


@Injectable()
export class MenuServiceService {
  uri:string;
  constructor(private http: HttpClient,private responseData:responseData)
  { 

  }

  public menuitems(): Observable<any> 
  {
    this.uri="/api/menu/menuitems/";
    
     return this.http.get(
     this.uri, { observe: 'response'})
     .catch(this.handleError.bind(this) );
  }

  



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };




}
