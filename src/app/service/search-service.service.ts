import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse,HttpResponse,HttpParams } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from 'rxjs/observable';
import { Ipagedata } from '../model/pagedata';
import { tap, skipWhile } from 'rxjs/operators';

@Injectable()
export class SearchServiceService {
  uri:string;
  constructor(private http:HttpClient) 
  {

  }
  public httpReqestInProgress: boolean = false;
  private currentPage = 1;
  public news: Array<any> = [];
public SearchResult(searchItem:string,pageindex:string,pagesize:string): Observable<any> 
{
    let querystring:string;
    this.uri="/api/items/";
    querystring = "?Page="+pageindex+ "&Count="+ pagesize +"&IsPagingSpecified=true&IsSortingSpecified=true&itemSearch=" +searchItem ;
    return this.http.get<Ipagedata>(
    this.uri+"SearchItem/"+querystring, { observe: 'response'})
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

  public SearchItems(page: number = 1, pagesize:number,searchItem:string, saveResultsCallback: (news) => void) {
   
    let querystring:string;
    this.uri="/api/items/";
    querystring = "?Page="+this.currentPage+ "&Count="+ pagesize +"&IsPagingSpecified=true&IsSortingSpecified=true&itemSearch=" +searchItem ;
   
    return this.http.get(
    this.uri+"SearchItem/"+querystring).pipe(
    skipWhile(() => this.httpReqestInProgress),
    tap(() => { this.httpReqestInProgress = true; }))
    .subscribe((news: any[]) => {
      this.currentPage++;
      saveResultsCallback(news);
      this.httpReqestInProgress = false;
    })
    
  }
 
 
}




