import { Component, OnInit,OnChanges } from '@angular/core';
//import * as $ from 'jquery';
import {ShoppingApiService} from '../../src/app/service/shopping-api.service'
import {allItems} from '../app/model/allitems'
import {ActivatedRoute} from '@angular/router'

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  items:any[];
  
constructor(public restProvider:ShoppingApiService,private route:ActivatedRoute){}
  public ngOnInit()
  {
    
    let categoryId = this.route.snapshot.params["category"];
    let pageIndex = this.route.snapshot.params["pageindex"];
   this.restProvider.AllItems(categoryId,pageIndex)
    .subscribe(
    data => { 
      this.items = data.body.allItems;
  },
  
);
  }
}
