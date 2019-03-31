import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse,HttpResponse,HttpParams } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from 'rxjs/observable';
import {allItems} from '../model/allitems'
import { catchError,retry } from 'rxjs/operators';
import { observableToBeFn } from 'rxjs/testing/TestScheduler';
import {tokenParams} from '../pages/login/token'
import { BehaviorSubject, Subject } from 'rxjs/Rx';
import {responseData,Ipagedata} from '../model/pagedata';
import {registration} from '../model/registration'
import { Inotify,itemNotify } from '../pages/itemdetails/item-notify';
import * as moment from "moment";
import {checkedInItems,checkedInItemsArray} from '../model/checkedInItems';
@Injectable()
export class ShoppingApiService {
uri:string;
public addToCardResponse :any[];
private loggedIn = false;
private json: any;

private subject = new Subject<itemNotify|null>()
  constructor(private http: HttpClient,private responseData:responseData)
  { 

  }
  public redirectUrl: string;
  AllItems(category:string,index:string): Observable<any> 
  {
    this.uri="/api/items/";
    const params = new HttpParams().set('categoryId', category).set("pageIndex",index);
     return this.http.get(
     this.uri+"AllItems/", { observe: 'response', params})
     
     .catch(this.handleError.bind(this) );
 
     
  }


  itemDetails(itemId:string): Observable<any> 
  {
    this.uri="/api/items/";
    const params = new HttpParams().set('itemId', itemId);
     return this.http.get(
     this.uri+"itemDetail/", { observe: 'response', params})
     .catch(this.handleError.bind(this) );
  }


addToCart(itemid:string,quantity:string,color:string,price:number,offerprice:number,deliverycharges:number,colorId:number): Observable<any>
{
  let querystring:string;
  let sessionToken:string;

  sessionToken=localStorage.getItem("sessionToken");
 
  querystring = "?itemid=" + itemid+ "&quantity="+quantity+"&color=" +color + "&sessionId=" + sessionToken + "&price=" + price  + "&offerprice=" + offerprice  + "&deliverycharges=" + deliverycharges   + "&colorId=" + colorId;
  this.uri="/api/items/";

  return this.http.post(
  this.uri+"addCart"+querystring,{ observe: 'response'})
   .catch(this.handleError.bind(this) );

}

getCheckedInItem(sessionId:string)//:Observable<any>
{
  let querystring:string;
  let sessionToken:string
 
  this.uri="/api/items/";

  const params = new HttpParams().set('userSession', sessionId);
  return this.http.get<checkedInItemsArray[]>(
  this.uri+"getcheckedinItem/", { observe: 'response', params})
  
  
  .catch(this.handleError.bind(this) );



}

public RemoveItem(itemid:string,quantity:string,sessionId:string,checkinid:string):Observable<any>
{
  let querystring:string; 
  let sessionToken:string;
  querystring = "?itemid=" + itemid+ "&returnedItemQty="+quantity + "&sessionId="+sessionId + "&checkedinId="+checkinid ;
  this.uri="/api/items/";
  return this.http.post(
  this.uri+"RemoveItems"+querystring,{ observe: 'response'})
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



public Login(userId:string,password:string):Observable<any>
{
  let encodedval = btoa(userId+":"+password);
  this.uri="/api/token/";
  let headers = new HttpHeaders().set('Content-Type', 'application/json')
                               .set('authorization', encodedval);
  
   return this.http.get(this.uri,{headers:headers})
   .do((res) =>{
    localStorage.setItem("email",userId);
    this.setSession(res); 
   }) 
   .shareReplay();



};


private setSession(authResult) {
  var currentDate = moment(authResult.expiration);
  var futureMonth = moment(currentDate).add(1, 'M');
  var futureMonthEnd = moment(futureMonth).endOf('month');
  
  if(currentDate.date() != futureMonth.date() && futureMonth.isSame(futureMonthEnd.format('YYYY-MM-DD'))) {
      futureMonth = futureMonth.add(1, 'd');
  }
  
  localStorage.setItem('id_token', authResult.authToken);
  localStorage.setItem("expires_at",futureMonth.toString()); 

  console.log(currentDate);
  console.log(futureMonth);


  
 ///// const expiresAt = moment().add(authResult.expiration,'minute');
  
  ///localStorage.setItem('id_token', authResult.authToken);
  ///localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
}      

logout() {
  localStorage.removeItem("id_token");
  localStorage.removeItem("expires_at");
}

public isLoggedIn() {
  return moment().isBefore(this.getExpiration());
}

isLoggedOut() {
  return !this.isLoggedIn();
}

getExpiration() {
  const expiration = localStorage.getItem("expires_at");
  const expiresAt = JSON.parse(expiration);
  return moment(expiresAt);
}   



public GetHomePageItems(pagesize:string,pageindex:string):Observable<any>


{
  let querystring:string;

this.uri="/api/items/"; 
querystring = "?Page="+pageindex+ "&Count="+ pagesize +"&IsPagingSpecified=true&IsSortingSpecified=true" ;
     return this.http.get<Ipagedata>(
     this.uri+"AllItemsOnPaging/"+querystring, { observe: 'response'})
     
     .catch(this.handleError.bind(this) );

     }

     public addUser(user:registration):Observable<any>
     {
      this.uri="/api/user/NewUser/";
      var headers = new HttpHeaders();
      headers.append('Content-Type', 'application/form-data');
      return this.http.post<registration>(this.uri,
          {
            "emailId": user.myemail,
            "password": user.password,
            "firstName": user.firstName,
            "middleName": user.middleName,
            "lastName": user.lastName,
            "mobile": user.mobile,
            "ulternateMobile": user.ulternateMobile,
            "pin":user.pin
          },
          {
              headers:headers
          }

      ).do((res) =>
      {
        debugger
        localStorage.setItem("email",user.myemail);
      });


     }
     
public changeSelectedItem(totalItem:itemNotify|null)
{
  this.subject.next(totalItem);
}


getItem():Observable<any>
{
  return this.subject.asObservable();

}


public async getOTP(mobile:string) //:Observable<optResponse>
{
  
  this.uri="/api/sms/Otpsender?mobileNumber="+mobile;
   return await this.http.get<optResponse>(this.uri, { observe: 'response'})
   .do((res) =>{
    this.setOTP(res)
   }) 
   .shareReplay()
   .catch(this.handleError.bind(this) )
   .toPromise()
};

private setOTP(resp) {
    debugger;
    if(resp.body.status==5){  //need to change to 5
    
    localStorage.setItem('OTP', resp.body.result);
    }
      else
      {
        localStorage.removeItem('OTP');
      }
  } 
  
  public paymentreceive(EmailId:string,session:string,rows: checkedInItemsArray[])
  {
    debugger;
      this.uri="/api/items/CheckoutPaymentReceived?emailId="+EmailId+"&UserSession="+session;
      var headers = new HttpHeaders();
      headers.append('Content-Type', 'application/form-data');
      return this.http.post(this.uri,rows ,
          {
              headers:headers
          });
        

  }

}




export class optResponse
{
  status:string;
  message:string;
}




