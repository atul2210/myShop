import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse,HttpResponse,HttpParams } from '@angular/common/http';
///////import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable, throwError } from 'rxjs';
import 'rxjs/Rx';
//import { Observable } from 'rxjs/observable';
import { catchError,retry } from 'rxjs/operators';
////////import { observableToBeFn } from 'rxjs/testing/TestScheduler';
import { BehaviorSubject, Subject } from 'rxjs';
import * as moment from "moment";
import { responseData } from '../../model/pagedata';
import { environment } from '../../../environments/environment';
 

@Injectable()
export class MenuServiceService {
  uri:string;
  baseUrl = environment.baseUrl;
  private subject = new Subject<string|null>()
  constructor(private http: HttpClient,private responseData:responseData)
  { 

  }

  public menuitems(): Observable<any> 
  {
    this.uri=this.baseUrl+"/api/menu/menuitems/";
   
     return this.http.get(
     this.uri, { observe: 'response'})
     .catch(this.handleError.bind(this) );
  }

public changeSelectedItem(totalItem:string|null)
{
  this.subject.next(totalItem);
}


getItem():Observable<any>
{
  return this.subject.asObservable();

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
    return throwError(
      'Something bad happened; please try again later.');
  };




}


export class SearchItem
{
  SearchString:string;
}
