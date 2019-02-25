import { Component, OnInit,OnChanges } from '@angular/core';
//import * as $ from 'jquery';
import {ShoppingApiService} from '../../src/app/service/shopping-api.service'
import {allItems} from '../app/model/allitems'
import {ActivatedRoute} from '@angular/router'
import { SearchServiceService } from './service/search-service.service';
import {LoadingIndicatorServiceService} from './service/loading-indicator-service.service';
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
  public categoryItemArray: Array<any> = [];
  private pageindex:number;
  private pagesize:number=5;
  public categoryId:number;
  public subcategory:number;
  public totalcount;
  loading:boolean=false;
constructor(private loadingIndicatorService: LoadingIndicatorServiceService,public restProvider:SearchServiceService,private route:ActivatedRoute){
  loadingIndicatorService
  .onLoadingChanged
  .subscribe(isLoading => this.loading = isLoading);
  


}
public ngOnInit()
  {
    
    
    this.subcategory= this.route.snapshot.params["subcategory"];
   
    this.pageindex = 0;
  
   this.onScrollDown();
 
  }


  public onScrollDown(): void {
    
    this.pageindex=this.pageindex+1;
    this.restProvider.AllItems(this.subcategory, this.pageindex,this.pagesize,(categoryItemArray)=>
    {
    this.totalcount = categoryItemArray.count;
        
      //  if(categoryItemArray.results.length<=this.totalcount)
      //   {
           this.categoryItemArray = this.categoryItemArray.concat(categoryItemArray.results);
           
      // }    
    });
  }


}
