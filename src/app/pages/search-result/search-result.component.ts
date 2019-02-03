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
  pageindex:number=0;
  pagesize:number=0;
  constructor(private router:Router,private route: ActivatedRoute,private http:SearchServiceService) { }

  ngOnInit() {
    const search: string = this.route.snapshot.params.item;
    
    this.getSearchResult(search);

  }
items:any[];
public async getSearchResult(itemName:string)
  {
    // this.router.navigateByUrl('/search/'+itemName);
    this.pageindex = this.pageindex+1; //alert(this.pageindex);
  this.pagesize=15;
   await this.http.SearchResult(itemName,this.pageindex.toString(),this.pagesize.toString())
    .subscribe((res)=>
    {
      this.items = res.body.results
      console.log(this.items);
      return this.items;
     
      
    });
  //  console.log(this.items[0].image);
  }
}
