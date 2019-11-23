import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit,Inject,Injectable, ViewChild, ViewEncapsulation } from '@angular/core';
import {ShoppingApiService} from '../../service/shopping-api.service';
import { itemNotify } from '../itemdetails/item-notify';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import {LoadingIndicatorServiceService} from '../../service/loading-indicator-service.service'
import {checkedInItems,checkedInItemsArray} from '../../model/checkedInItems';
import { Location } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],
  encapsulation: ViewEncapsulation.None,

styles: [
    `
      @media screen and (max-width: 800px) {
        .desktop-hidden {
          display: initial;
        }
        .mobile-hidden {
          display: none;
        }
      }
      @media screen and (min-width: 800px) {
        .desktop-hidden {
          display: none;
        }
        .mobile-hidden {
          display: initial;
        }
      }
    `
  ]



})
@Injectable()
export class CheckinComponent implements OnInit {
  cartItems:any;
  loading:boolean=false;
  @ViewChild('myTable') table: any;

  rows: any[] = [];
  expanded: any = {};
  timeout: any;
  OfferPriceSum:number=0;
  saveSum:number=0;
  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, @Inject(DOCUMENT) private document: any, private ShoppingApiService:ShoppingApiService,private itemnotify:itemNotify,
  private route:Router,private loadingIndicatorService: LoadingIndicatorServiceService,private location: Location ) { 

    loadingIndicatorService
    .onLoadingChanged
    .subscribe(isLoading => this.loading = isLoading);
   

  }

  ngOnInit() {
    this.GetCheckedInItems();
    
   
  } 

GetCheckedInItems()
{
  let userSessionid:string;  
  userSessionid = this.localStorage.getItem("id_token"); 
  if(userSessionid!==null)
  {
      this.ShoppingApiService.getCheckedInItem(userSessionid)
      .subscribe(
        (data:checkedInItemsArray) => { 
        
        this.cartItems= data.body;
       
        for(let i =0;i<this.cartItems.length;i++ )
        {
         
          if( this.cartItems[i].image1!=='undefined')
        
          this.cartItems[i].image1 = 'data:image/jpeg;base64,' +  this.cartItems[i].image1;
        }
        
        this.rows =this.cartItems;
        
       
        this.itemnotify.totalCartItem = this.rows.length;
        this.getSum(this.rows);
        return this.rows;
        });
  }
}

public getSum(sum:any[]) {
  this.OfferPriceSum=0;
  this.saveSum=0;
  for(var i = 0; i < sum.length; i++){
    this.OfferPriceSum =this.OfferPriceSum+sum[i].offerprice;
    this.saveSum = this.saveSum + ((sum[i].price) - (sum[i].offerprice));
   
  }
  
}

public myFunction(item) {
document.getElementById("demo").innerHTML = this.rows.reduce(this.getSum);
}
 public RemoveItems(itemid:string,quantity:string,checkinid:string)
  {
   
    const idToken= this.localStorage.getItem("id_token");
      
    if(idToken)
    {
      let header = new HttpHeaders();
      header.set("Authorization","Bearer "+ idToken);
    }
    else
      this.route.navigateByUrl('/login');

          this.ShoppingApiService.RemoveItem(itemid,quantity,idToken,checkinid)
          .subscribe((res)=>
          {
            
            this.GetCheckedInItems();
            
      });
      
      this.ShoppingApiService.changeSelectedItem(this.itemnotify);

  }

private notify():void
{
  this.ShoppingApiService.changeSelectedItem(this.itemnotify)
  

}


 placeOrder()
{
  let localstorage:string = this.localStorage.getItem("id_token");
  let EmailId:string = this.localStorage.getItem("email");

  
  if(localstorage==null )
  {
    this.route.navigateByUrl('/login');
  }
    else
    {
        console.log("Move to payment gateway");
        this.route.navigateByUrl("/PlaceOrder/");
        // if(EmailId!=='undefined')
        // {
        //   this.ShoppingApiService.paymentreceive(EmailId,localstorage,this.rows)
        //   .subscribe((res:Response) =>
        //   {
          
        //     //if status code is unauthorized.. need to redirect login page with error message
        //   },
        //   err => 
        //   {
        //     if(err.status!==200)
        //     {
        //       localStorage.removeItem("id_token");
        //       this.route.navigateByUrl('/login')
        //     }

        //   }
       
        
        //);
       // }
    }


  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }
fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
   
  }

  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }



}






