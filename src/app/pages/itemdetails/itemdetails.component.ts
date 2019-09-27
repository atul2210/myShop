import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShoppingApiService} from '../../service/shopping-api.service';
import {HomepageComponent} from '../../home/homepage/homepage.component';
import {Globals} from '../../model/global';
import { ColdObservable } from 'rxjs/testing/ColdObservable';
import {Iitems} from '../../pages/iitems';
import { Router } from '@angular/router';
import { CartItemServiceService } from '../../service/cart-item-service.service';
import { itemNotify, Inotify } from './item-notify';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-itemdetails',
  templateUrl: './itemdetails.component.html',
  styleUrls: ['./itemdetails.component.css']
 
})
export class ItemdetailsComponent implements OnInit {
addedItemCount:number;  
//itemDetail:any[];


colorDetail:any[];
color:string;
quantity:number=1;
itemid:string;
colorname: string;
showSelected: boolean=false;
price:number;
offerprice:number;
deliverycharges:number;
img1:any;
coloId:number;
sizeName:string;
category:string;
brand:string;
availableQty:number;
breakpoint: number;
displayError:boolean=false;

  constructor( public restProvider:ShoppingApiService,public HomepageComponent:HomepageComponent,private route:ActivatedRoute, private globals:Globals,
    private router:Router, private CartItemServiceService:CartItemServiceService,private inotify:itemNotify){

  }
  itemDetail:any[]; 
 
  public ngOnInit()
  {
    //const img1 = require('./assets/thumbnail.jpg');
    //const img2 = require('./assets/thumbnail2.jpg');
    
    //$('#74').ezPlus();

    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;

    
    
    this.itemid = this.route.snapshot.params["itemid"];
    this.restProvider.itemDetails(this.itemid)
    .subscribe(
      data => { 
      this.itemDetail= Array.of(data.body)
      this.colorDetail =data.body.availableColor.split(";")
      this.colorname=this.colorDetail[0]
      this.price = data.body.price
      this.offerprice = data.body.offerPrice
      this.deliverycharges = data.body.deliveryCharges
      this.coloId = data.body.colorId
      this.sizeName = data.body.sizeName
      this.category = data.body.categoryName
      this.brand = data.body.brand
      this.availableQty = data.body.availableQty
      
        if(this.availableQty==0) 
        {
         
          this.displayError=true;
        }
        else 
          this.displayError=false;
         // alert(this.availableQty)
      
    }
    
  );



  }

  overTitle(){
    if(this.showSelected == true){ ;
      this.showSelected = false;
    }
    else {
      this.showSelected = true; 
    }
  }

  
  addToCart()
  {
      let sessionToken:string;
      sessionToken=localStorage.getItem("sessionToken");        
      this.restProvider.addToCart(this.itemid,'1')
      
      .subscribe(
        data => 
        { 
          if(sessionToken==null && data!=null)
          {
            localStorage.setItem("sessionToken",data.sessionIdToken); 
            
          }
          this.inotify.totalCartItem = data.count; 
          this.notifyTotalItem(this.inotify);
          this.router.navigateByUrl('/checkin');
       });
       
       //this.notifyTotalItem(this.inotify);
  }

    private getColor(colorName:string)
    {
      this.colorname=colorName;
    }


    // private purchase()
    // {
    //   let sessionToken:string;
    //   sessionToken = localStorage.getItem("sessionToken");
    //   if(sessionToken==null || sessionToken=="")
    //   {
    //       this.router.navigateByUrl("/login")

    //   }
    //   //else transfer for payment gateway

    // }

private notifyTotalItem(totalItem:Inotify)
{ 
  this.restProvider.changeSelectedItem(totalItem);
}

onResize(event) {
  this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
}

}
