import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShoppingApiService} from '../../service/shopping-api.service';
import { Router } from '@angular/router';
import {SingletonService} from '../../service/singleton.service';
import {ReactiveFormsModule,FormsModule,NgControl,  FormGroup,FormControl,ValidationErrors,Validator, Validators} from '@angular/forms';
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  myform: FormGroup;
  address:FormControl;
  city:FormControl;
  mystate:FormControl;
  pin:FormControl;
  resp:any=null;
  constructor(private singleton:SingletonService,private route:Router,private active:ActivatedRoute,private service:ShoppingApiService) { }
  
  get currentsession():string
  {
    return this.singleton.session;
  }
  set currentsession(value:string)
  {
    this.singleton.session=value;
  }

  ngOnInit() 
  {
    let userform:FormGroup;
    this.createFormControls();
    this.createForm();

  }

  GetAddress()
  {
    this.service.GetAddress(this.currentsession)
    .subscribe((res:Response)=>
    {
        console.log(res);
    }
    );

  }

  Order()
  {
    if(this.currentsession!=='undefined')
    {
     this.service.paymentreceive(this.currentsession)
      .subscribe((res:Response) =>
      {
       
        this.resp =res;
        //if status code is unauthorized.. need to redirect login page with error message
      },
      err => 
      {
        if(err.status!==200)
        {
          localStorage.removeItem("id_token");
          this.route.navigateByUrl('/login');
        }

      });


      }

  }


  createForm() {
    this.myform = new FormGroup({
      //name: new FormGroup({
      
      address:this.address,
      city:this.city,
      mystate:this.mystate,
      pin:this.pin
      
    });
  }
  createFormControls() {
   
    this.city = new FormControl('',Validators.required);
   
    this.mystate= new FormControl('',Validators.required);
   
    this.pin= new FormControl('',Validators.required);
    this.address= new FormControl('',Validators.required);
      }

}
