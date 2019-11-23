import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit,EventEmitter,OnDestroy , Inject} from '@angular/core';
import {Globals} from '../../model/global';
import {ShoppingApiService} from '../../service/shopping-api.service'
import { CartItemServiceService } from '../../service/cart-item-service.service';
import { Inotify,itemNotify } from '../../pages/itemdetails/item-notify';
import { SubscriptionLike as ISubscription } from "rxjs";
import {SearchResultComponent} from '../../../app/pages/search-result/search-result.component'
import {LoadingIndicatorServiceService} from '../../service/loading-indicator-service.service';
import {MenuServiceService} from '../../service/menu/menu-service.service';
import { Router } from '@angular/router';
import { checkedInItemsArray } from '../../model/checkedInItems';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit,OnDestroy {
  itemname:string;
  menuitems:string[];
  loading:boolean=false;
  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private router:Router, private search : SearchResultComponent,private globals: Globals,private ShoppingApiService:ShoppingApiService,
  private CartItemServiceService:CartItemServiceService,public totalItem:itemNotify,private loadingIndicatorService: LoadingIndicatorServiceService,private service:MenuServiceService ) 
  
  { 

  }
  private subscription: ISubscription;
  private fullNameSubcription: ISubscription;
  private subs: ISubscription;
  itemReceivedAddToCard :any[];
  count:number;
  fullName:string;
  cartItems:any;
  


  ngOnInit() 
  {
    
    this.GetMenuItems();
    this.loadingIndicatorService
    .onLoadingChanged
    .subscribe(isLoading => this.loading = isLoading);

    this.getcheck();

   this.subscription= this.ShoppingApiService.getItem()
    .subscribe( 
        ttlItems=>
        {
         this.totalItem = ttlItems; 
         
        });
        if(this.localStorage.getItem("fullName")===null)
        {

        this.fullNameSubcription = this.ShoppingApiService.getUserFullName()
          .subscribe(fullname=>
          {
            this.fullName ="Hi "+fullname;
            this.localStorage.setItem("fullName",this.fullName)
          }
        )
        }
        else this.fullName= this.localStorage.getItem("fullName");

        
  }
  public GetMenuItems()
  {
    this.subs = this.service.menuitems()
    .subscribe((res)=>
    {
      this.menuitems = res.body;
     
  
    });
  }

ngOnDestroy()
{
  this.subscription.unsubscribe();
  this.subs.unsubscribe();
}




  public getCheckedInItems():any
  {
    
    this.router.navigateByUrl('/checkin');
  this.getcheck();

  }

  public getcheck()
  {

    let userSessionid:string;  
    userSessionid = this.localStorage.getItem("id_token");
    if(userSessionid!==null){
    this.ShoppingApiService.getCheckedInItem(userSessionid)
    .subscribe(
      (data:checkedInItemsArray) => { 
       this.cartItems= data.body;
       this.totalItem.totalCartItem = data.body.length;
        return this.cartItems;
      });
    }

  }

  searchResult()
  {
   // temporarily commented - 25 Feb 2019
   /// this.service.changeSelectedItem(this.itemname);
   ////temporirly commented end here
    this.router.navigateByUrl('/TempRouteSearch/'+this.itemname+'/search');
  }
  RedirectToLogin()
  {
    this.router.navigateByUrl('/login')

  }
 
}
