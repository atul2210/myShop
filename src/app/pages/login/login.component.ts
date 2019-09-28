import { Component, OnInit,Input } from '@angular/core';
import {tokenParams} from './token'
import {ShoppingApiService} from '../../service/shopping-api.service'
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import {authguard} from '../../service/auth-guard'
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { stringify } from '@angular/core/src/render3/util';
import { variable } from '@angular/compiler/src/output/output_ast';
import { LoadingIndicatorServiceService } from '../../service/loading-indicator-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  token:tokenParams=new tokenParams();
  details:any[];
  public redirectUrl: string;
  returnUrl:string;

  display='none'; //default Variable
  err:string;
  isOk=false;
  mobile:string="";
  loading:boolean=false;
  constructor( private route: ActivatedRoute,private loadingIndicatorService: LoadingIndicatorServiceService,
            private router: Router,private authguard:authguard,  private http:ShoppingApiService, private fb:FormBuilder,private location:Location) 
    
   {
    loadingIndicatorService
    .onLoadingChanged
    .subscribe(isLoading => this.loading = isLoading);

   }
   
  ngOnInit():void {
  this.loginForm=this.fb.group({

        username:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
        
        password:['',[Validators.required]],
        rememberme:{value:true,disabled:false}, //default value
        mobileNumber:['na',[Validators.required]]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

 }
  
 populateTestData():void {



}


  onSubmit() 
  {
    let userid = this.loginForm.controls["username"].value;
    let password =  this.loginForm.controls["password"].value;
    this.http.Login(userid,password)

    .subscribe(data=>
          {
          console.log('data',data)
          this.http.userFullName(data.fullname)
          this.router.navigateByUrl('/HomeComponent')
  })
    err => 
    {
      
      if(err.status!==200)
      {
      
        console.error('dfdfdfd',err.statusText)
        localStorage.setItem("id_token",'');
        
        this.err=err.statusText;
      }

    }
    this.location.back(); // <-- go back to previous location
  
}

openModalDialog()
{
  this.display='block'; //Set block css
  this.loginForm.controls["mobileNumber"].patchValue('');
  this.isOk=false;
  return false;
}

closeModel()
{
  this.display='none';
  //this.mobile="";
  this.loginForm.controls["mobileNumber"].patchValue('na');

}
public forgetpassword()
{
 
  this.router.navigateByUrl('forgetpassword');
}
public changepassword()
{
 
  this.router.navigateByUrl('changepassword');
}
async closeModalDialog()
{
    let resp;
    this.loginForm.controls["username"].setValue('na@na.com');
    this.loginForm.controls["password"].setValue('nana');
    this.mobile= this.loginForm.controls["mobileNumber"].value;
    if(this.mobile.trim()!="")
    {
      let res = await this.http.getOTP(this.mobile)
          .then((res:Response)=>{                 
            resp = res;
           
              this.isOk=false;
              this.display='none'; //set none css after close dialog
              this.router.navigateByUrl("/registration/"+this.mobile);
           
          })
          .catch(err=>
          {
            
            this.isOk =true;
            this.err=err;
            //this.router.navigateByUrl("/Error/"+"err" +"/logi/"+this.mobile);
          
          });
    }
    else
      return false;
    }
}

