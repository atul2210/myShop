import {HttpRequest,HttpHandler,HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ShoppingApiService} from './shopping-api.service';
import { Observable } from 'rxjs';


@Injectable()
export class serviceintercepter implements HttpInterceptor
{
    constructor(public http:ShoppingApiService)
    {

    }
    intercept(request:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>>
    {
       const idToken= localStorage.getItem("Id_token");
      
       if(idToken){ 
       const clone = request.clone({
           
        headers:request.headers.set("Authorization","Bearer "+ idToken)
            });
           
            return next.handle(clone);
        }
        else {
            
            return next.handle(request);
        }
       

    }

}
