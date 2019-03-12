import { Component, OnInit,Inject,Injectable, ViewChild, ViewEncapsulation } from '@angular/core';
import {ShoppingApiService} from '../../service/shopping-api.service';
import { itemNotify } from '../itemdetails/item-notify';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import {LoadingIndicatorServiceService} from '../../service/loading-indicator-service.service'
import {checkedInItems,checkedInItemsArray} from '../../model/checkedInItems';
@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],
  encapsulation: ViewEncapsulation.None
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
  constructor(@Inject(DOCUMENT) private document: any, private ShoppingApiService:ShoppingApiService,private itemnotify:itemNotify,
  private route:Router,private loadingIndicatorService: LoadingIndicatorServiceService ) { 

    loadingIndicatorService
    .onLoadingChanged
    .subscribe(isLoading => this.loading = isLoading);
    //ngxdatable
    // this.fetch((data) => {
    //   this.rows = data;
    // });

  }

  ngOnInit() {
    this.GetCheckedInItems();
    
   
  } 

GetCheckedInItems()
{
  let userSessionid:string;  
  userSessionid = localStorage.getItem("sessionToken");
  this.ShoppingApiService.getCheckedInItem(userSessionid)
  .subscribe(
    (data:checkedInItemsArray) => { 
     
     this.cartItems= data.body;
     debugger;
    
     
     this.rows =this.cartItems;
    
     this.getSum(this.rows);
     debugger;
      return this.rows;
    });

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
   
        let userSessionid:string;  
        userSessionid = localStorage.getItem("sessionToken");
          this.ShoppingApiService.RemoveItem(itemid,quantity,userSessionid,checkinid)
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


private placeOrder()
{
  let localstorage:string = localStorage.getItem("id_token");
  let EmailId:string = localStorage.getItem("email");
  alert(EmailId);
  let userSessionid = localStorage.getItem("sessionToken");
  if(localstorage==null )
  {
    this.route.navigateByUrl('/login');
  }
    else
    {
        alert("go to payment gateway");
        
        if(EmailId!=='undefined')
        {
          this.ShoppingApiService.paymentreceive(EmailId,userSessionid,this.rows)
          .subscribe((res:Response) =>
          {
          });
        }
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
    console.log('Detail Toggled', event);
  }


}






