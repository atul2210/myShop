import { Component, OnInit } from '@angular/core';
import { ShoppingApiService } from '../../service/shopping-api.service';
import { FormGroup,FormControl,ValidationErrors,Validator,Validators, FormBuilder } from '@angular/forms';
import {Router } from '@angular/router'
import { rsetpassword,resetpasswordArray } from '../../model/resetpassword';
@Component({
  selector: 'app-foreget-password',
  templateUrl: './foreget-password.component.html',
  styleUrls: ['./foreget-password.component.css']
})
export class ForegetPasswordComponent implements OnInit {
  display='none'; //default Variable
  err:string="";
  isOk=false;
  mobile:string="";
  loading:boolean=false;
  data;
  myform: FormGroup;
  username: FormControl;

  items:any;

  constructor(private fb:FormBuilder,private http:ShoppingApiService,private router:Router) { }
  
  ngOnInit() {
    this.myform=this.fb.group({

      username:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
      
      // password:['',[Validators.required]],
      // rememberme:{value:true,disabled:false}, //default value
      // mobileNumber:['na',[Validators.required]]
  });
  }



async SendMail()
{
  
  let resp;
 let email = this.myform.controls["username"].value;
  if(email.trim()!="")
  {
    let res = await this.http.ResetPassword(email)
     //   .then((resp:resetpasswordArray) => 
        .then((resp:resetpasswordArray) =>
        {  
           this.items = resp.body;
           this.err = this.items;
           
          this.isOk=true;
          // if(resp.body.status==5) 
          // {
          //   this.isOk=false;
          //   this.display='none'; //set none css after close dialog
           
          // }
          // else
          // {
          //   this.isOk =true;
          // }
        })
        .catch(err=>
        {
          
          this.isOk =true;
          this.err=err;
          //this.router.navigateByUrl("/Error/"+"err" +"/logi/"+this.mobile);
        
        });
  }
  else return false;
    
  }

 

}



