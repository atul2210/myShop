import { Component, OnInit,AfterViewInit,ElementRef } from '@angular/core';
import {ReactiveFormsModule,FormsModule,NgControl,  FormGroup,FormControl,ValidationErrors,Validator, Validators} from '@angular/forms'
import {Router,ActivatedRoute} from '@angular/router';
import {registration} from '../../model/registration';
import {ShoppingApiService} from '../../service/shopping-api.service'


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  status;
  myform: FormGroup;
  display='none'; //default Variable
  err:string="";
  isOk=false;
  mobile:string="";
  loading:boolean=false;
  data;
  
  myemail: FormControl;
  password: FormControl;
  confirmpassword: FormControl;
  items:any;

  constructor(private ActivatedRoute:ActivatedRoute,private router:Router,private ShoppingApiService:ShoppingApiService) { }

  ngOnInit() {
    let userform:FormGroup;
    
    this.myemail = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);

      this.password = new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]);

      this.confirmpassword = new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]);

      this.myform = new FormGroup({
        
      myemail: this.myemail,
      password: this.password,
      confirmpassword: this.confirmpassword,
    });

  }

  changepassword()
  {
    if(this.myform.valid)
    {

     let email =  this.myform.controls["myemail"].value;
     let password= this.myform.controls["password"].value;
     let confirmpassword= this.myform.controls["confirmpassword"].value;
      this.ShoppingApiService.changepassword(email,password,confirmpassword)
      .subscribe((res:Response)=>
      {
        this.items=res;
        this.err= this.items.body.result;
      },
      err=>{
        this.err=err;
      }
    
    )

     
     
      
    }
    
    
    
  }

}
