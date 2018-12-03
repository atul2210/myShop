import { Component, OnInit,Inject,Injectable } from '@angular/core';
import {ShoppingApiService} from '../../service/shopping-api.service';
import { itemNotify } from '../itemdetails/item-notify';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
@Injectable()
export class CheckinComponent implements OnInit {
  cartItems:any;
  constructor(@Inject(DOCUMENT) private document: any, private ShoppingApiService:ShoppingApiService,private itemnotify:itemNotify,private route:Router ) { 

  }

  ngOnInit() {

    let userSessionid:string;  
    userSessionid = localStorage.getItem("sessionToken");
    this.ShoppingApiService.getCheckedInItem(userSessionid)
    .subscribe(
      (data:Response) => { 
       this.cartItems= data.body;
       //console.log(this.cartItems)
        return this.cartItems;
      });
    console.log(this.cartItems);
  } 
 public RemoveItems(itemid:string,quantity:string,checkinid:string)
  {
        let userSessionid:string;  
        userSessionid = localStorage.getItem("sessionToken");
          this.ShoppingApiService.RemoveItem(itemid,quantity,userSessionid,checkinid)
          .subscribe((res)=>
          {
            
            let element = this.document.getElementById(itemid);  
            element.style.display="none"    
            this.itemnotify.totalCartItem = res.count;
            //this.notify();

      });
      this.ShoppingApiService.changeSelectedItem(this.itemnotify);

  }

private notify():void
{
  this.ShoppingApiService.changeSelectedItem(this.itemnotify)
  

}


private placeOrder()
{
  let localstorage:string = localStorage.getItem("id_token");
  if(localstorage==null )
  {
    this.route.navigateByUrl('/login');
  }
    else
    {
        alert("go to payment gateway");

    }


  }

}






