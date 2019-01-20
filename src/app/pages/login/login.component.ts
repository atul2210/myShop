import { Component, OnInit,Input } from '@angular/core';
import {tokenParams} from './token'
import {ShoppingApiService} from '../../service/shopping-api.service'
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import {authguard} from '../../service/auth-guard'
import { Router, ActivatedRoute } from '@angular/router';

import { stringify } from '@angular/core/src/render3/util';
import { variable } from '@angular/compiler/src/output/output_ast';

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
  isOk=false;
  mobile:string="";

  constructor( private route: ActivatedRoute,
            private router: Router,private authguard:authguard,  private http:ShoppingApiService, private fb:FormBuilder) { }
   
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
         this.router.navigateByUrl('/HomeComponent');
  });
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

async closeModalDialog()
{
    let resp;
    this.mobile= this.loginForm.controls["mobileNumber"].value;
    if(this.mobile.trim()!="")
    {
      let res = await this.http.getOTP(this.mobile)
          .then((res:Response)=>{                 
            resp = res;
            if(resp.body.status==5) //need to change
            {
              this.isOk=false;
              this.display='none'; //set none css after close dialog
              this.router.navigateByUrl("/registration/"+this.mobile);
            }
            else
            {
              this.isOk =true;
            }
          });
    }
    else
      return false;
    }
}

