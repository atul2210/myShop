import {Component,OnInit,Injectable} from '@angular/core';
import {CanActivate,Router,ActivatedRoute,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router'
import {ShoppingApiService}from './shopping-api.service';

@Injectable()
export class authguard implements CanActivate
{
   
    returnUrl: string;
    constructor(private appservice:ShoppingApiService,private router:Router,private route:ActivatedRoute)
    
    {}
        ngOnInit() {
            this.returnUrl = this.route.snapshot.queryParams['home'] || '/';
           
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
    
        //return this.checkLogin(url,state);
         const idToken= localStorage.getItem("id_token"); 
        
        if(idToken)
        {
          
            //added on 15 jul 2018
            // this.router.navigate(['home']);
            return true;
        }
        
        else 
        {
// not logged in so redirect to login page with the return url and return false
             this.router.navigate(['/login']);
              return false;
         }
      }
    
      public checkLogin(url: string,state: RouterStateSnapshot): boolean {
    
        const idToken= localStorage.getItem("Id_token"); 
        if(idToken)
        {
           
            //added on 15 jul 2018
            // this.router.navigate(['home']);
            return true;
       }
        
        else {
// not logged in so redirect to login page with the return url and return false
        this.router.navigate(['/login']);
        return false;
      }
    }

}
