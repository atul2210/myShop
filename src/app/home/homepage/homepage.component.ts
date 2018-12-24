import { Component, OnInit,EventEmitter,OnDestroy } from '@angular/core';
import {Globals} from '../../model/global';
import {ShoppingApiService} from '../../service/shopping-api.service'
import { CartItemServiceService } from '../../service/cart-item-service.service';
import { Inotify,itemNotify } from '../../pages/itemdetails/item-notify';
import { ISubscription } from "rxjs/Subscription";
import {SearchResultComponent} from '../../../app/pages/search-result/search-result.component'
import {LoadingIndicatorServiceService} from '../../service/loading-indicator-service.service';
import {MenuServiceService} from '../../service/menu/menu-service.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit,OnDestroy {
  itemname:string;
  menuitems:string[];
  loading:boolean=false;
  constructor(private search : SearchResultComponent,private globals: Globals,private ShoppingApiService:ShoppingApiService,
  private CartItemServiceService:CartItemServiceService,private totalItem:itemNotify,private loadingIndicatorService: LoadingIndicatorServiceService,private service:MenuServiceService ) 
  
  { 
    loadingIndicatorService
    .onLoadingChanged
    .subscribe(isLoading => this.loading = isLoading);
    

  }
  private subscription: ISubscription;
  private subs: ISubscription;
  itemReceivedAddToCard :any[];
  count:number;

  cartItems:any;
  


  ngOnInit() 
  {
    this.GetMenuItems();

   this.subscription= this.ShoppingApiService.getItem()
    .subscribe( 
        ttlItems=>
        {
          this.totalItem = ttlItems; 
          
        });


        
  }
  public GetMenuItems()
  {
    this.subs = this.service.menuitems()
    .subscribe((res)=>
    {
      this.menuitems = res.body;
      console.log(res);
  
    });
  }

ngOnDestroy()
{
  this.subscription.unsubscribe();
  this.subs.unsubscribe();
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
