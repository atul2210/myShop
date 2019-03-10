import { Component, OnInit,Inject,Injectable, ViewChild, ViewEncapsulation } from '@angular/core';
import {ShoppingApiService} from '../../service/shopping-api.service';
import { itemNotify } from '../itemdetails/item-notify';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import {LoadingIndicatorServiceService} from '../../service/loading-indicator-service.service'
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
    (data:Response) => { 
     this.cartItems= data.body;
     //console.log(this.cartItems)
     
     this.rows =this.cartItems;
     console.log(this.cartItems);
      return this.rows;
    });

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
  if(localstorage==null )
  {
    this.route.navigateByUrl('/login');
  }
    else
    {
        alert("go to payment gateway");

      //  ShoppingApiService.paymentreceive()

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






