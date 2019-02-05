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
  pageindex:number=1;
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
    this.search = this.route.snapshot.params.item;
    this.onScrollDown(this.search);
    

   }

  ngOnInit() {
    
  }
  public items: Array<any> = [];
  
  public onScrollDown(searchitem:string): void {
  this.service.SearchItems(this.pageindex,this.pagesize,searchitem,(items)=>
  {
      this.items = this.items.concat(items.results);
          
  });
}
 

}





