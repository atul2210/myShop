import { Component, OnInit, } from '@angular/core';
import {SearchServiceService} from '../../service/search-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ipagedata,responseData } from '../../model/pagedata';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  pageindex:number;
  pagesize:number=20;
  data:string;  
  imageItems:any[];
  pageArray:any[];
  count:number;
  dynamicHtml:string;
  searchItem:any[];
  search: string

  constructor(private responseData:responseData,private router:Router,private route: ActivatedRoute,private service:SearchServiceService) 
  {
  
      this.route.params.subscribe(params => {
      this.search = this.route.snapshot.params.item;
      this.pageindex=0;
     // this.router.onSameUrlNavigation='reload';
      this.onScrollDown(this.search);
  });


   }

  ngOnInit() {
    // this.search = this.route.snapshot.params.item;
    // this.onScrollDown(this.search);
  

  }
  public items: Array<any> = [];
  
  public onScrollDown(searchitem:string): void { 
    this.pageindex=this.pageindex+1;
  this.service.SearchItems(this.pageindex,this.pagesize,searchitem,(items)=>
  {
  alert(searchitem);
    this.count = items.count;
    if(items.results.length<=this.count)
    {
      this.items = this.items.concat(items.results);
    }
          
  });
}
 

}





