import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit,AfterViewInit,ElementRef , Inject} from '@angular/core';
import {ReactiveFormsModule,FormsModule,NgControl,  FormGroup,FormControl,ValidationErrors,Validator, Validators} from '@angular/forms'
import {Router,ActivatedRoute} from '@angular/router'
import {registration} from '../../model/registration'
import {ShoppingApiService} from '../../service/shopping-api.service'
import {LoginComponent} from '../login/login.component'


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {
//////  isOtpOK:boolean=true;
  states: string[] = [
    'Uttar Pradesh',
    'Delhi',
    'Madhya Pradesh',
  ];
  myform: FormGroup;
  mobile:FormControl;
  firstName: FormControl;
  middleName:FormControl;
  lastName: FormControl;
  myemail: FormControl;
  password: FormControl;
  //language: FormControl;
  city:FormControl;
  address:FormControl;
  mystate:FormControl;
  ulternatemobile:FormControl;
  pin:FormControl;
  otp:FormControl;
  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private ActivatedRoute:ActivatedRoute,private router:Router,private ShoppingApiService:ShoppingApiService) { }
  submitted:boolean;
  
  ngOnInit() {
    let userform:FormGroup;
    
    this.createFormControls();
    this.createForm();
   
    this.myform.controls["mobile"].patchValue(this.ActivatedRoute.snapshot.params['mobile']);
    
    }
    createFormControls() {
      this.mobile= new  FormControl('',Validators.required)
      this.firstName = new FormControl('', Validators.required);
      this.middleName = new FormControl('');
      this.lastName = new FormControl('', Validators.required);
      this.myemail = new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]);
      this.password = new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]);
      this.city = new FormControl('',Validators.required);
      this.address= new FormControl('',Validators.required);
      this.mystate= new FormControl('',Validators.required);
      this.ulternatemobile = new FormControl('');
      this.pin= new FormControl('',Validators.required);
      this.otp = new FormControl('',Validators.required);
    }
  
    createForm() {
      this.myform = new FormGroup({
        //name: new FormGroup({
        mobile:this.mobile,
        firstName: this.firstName,
        middleName:this.middleName,
        lastName: this.lastName,
        myemail: this.myemail,
        password: this.password,
        address:this.address,
        city: this.city,
        mystate:this.mystate,
        ulternatemobile:this.ulternatemobile,
        pin:this.pin,
        otp: this.otp
     //}),
      });
    }

    save() 
    { 
      
      if(this.myform.valid)
      {

        let data: registration;
        data = new registration();
        data.mobile = this.myform.controls['mobile'].value; 
        data.ulternateMobile = this.myform.controls["ulternatemobile"].value;
        data.firstName = this.myform.controls["firstName"].value;
        data.middleName = this.myform.controls["middleName"].value;
        data.lastName = this.myform.controls["lastName"].value;
        data.myemail = this.myform.controls["myemail"].value;
        data.password = this.myform.controls["password"].value;
        data.address = this.myform.controls["address"].value;
        data.city = this.myform.controls["city"].value;
        data.mystate = this.myform.controls["mystate"].value;
        data.pin = this.myform.controls["pin"].value;
        data.otp = +this.myform.controls["otp"].value;
        //let otpSent = localStorage.getItem('OTP');

        // if(+otpSent==data.otp) 
        // {
          
       ///////   this.isOtpOK=false;
          this.ShoppingApiService.addUser(data)
          .subscribe((m)=>
          {
               this.router.navigate(['/checkin']);
          },
          (err) => 
          {
            this.router.navigateByUrl("/Error/"+err.error.Message +"/regis/"+data.mobile )
          });
    }
  }
    
  }

  


