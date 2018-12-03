import { Component, OnInit,EventEmitter,OnDestroy } from '@angular/core';
import {Globals} from '../../model/global';
import {ShoppingApiService} from '../../service/shopping-api.service'
import { CartItemServiceService } from '../../service/cart-item-service.service';
import { Inotify,itemNotify } from '../../pages/itemdetails/item-notify';
import { ISubscription } from "rxjs/Subscription";
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit,OnDestroy {

  constructor(private globals: Globals,private ShoppingApiService:ShoppingApiService,private CartItemServiceService:CartItemServiceService,private totalItem:itemNotify) { }
  private subscription: ISubscription;
  itemReceivedAddToCard :any[];
  count:number;

  cartItems:any;
  


  ngOnInit() 
  {
   this.subscription= this.ShoppingApiService.getItem()
    .subscribe( 
        ttlItems=>
        {
          this.totalItem = ttlItems; 
          
        });
        
  }

ngOnDestroy()
{
  this.subscription.unsubscribe();
}


  public getCheckedInItems():any
  {
    // this.count = this.getAddedItemTotal();alert(this.count);
    let userSessionid:string;  
    userSessionid = localStorage.getItem("sessionToken");
    this.ShoppingApiService.getCheckedInItem(userSessionid)
    .subscribe(
      (data:Response) => { 
       this.cartItems= data.body;
        return this.cartItems;
      });

  }




 
}
