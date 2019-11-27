

import { HttpInterceptor,HttpXsrfTokenExtractor,HttpRequest,HttpHandler,HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/observable'
@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerName = 'X-XSRF-TOKEN';
 
    let token = this.tokenExtractor.getToken() as string;
    ///let token = localStorage.getItem("xsrf");
    let requestToForward = req;
    
      if (token === null ) {
        requestToForward = req.clone({ withCredentials: true,
          });
    }
    else{
      requestToForward = req.clone({ withCredentials: true,
          headers: req.headers.set(headerName, token) });
    }
    return next.handle(requestToForward);
    
  }
}