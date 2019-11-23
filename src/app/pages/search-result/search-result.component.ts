import { Component, OnInit, Input  } from '@angular/core';
import {SearchServiceService} from '../../service/search-service.service';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { Ipagedata,responseData } from '../../model/pagedata';
import {MenuServiceService} from '../../service/menu/menu-service.service';
import { SubscriptionLike as ISubscription } from 'rxjs';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  pageindex:number=0;
  pagesize:number=8;
  data:string;  
  imageItems:any[];
  pageArray:any[];
  count:number;
  dynamicHtml:string;
  searchItem:any[];
  search: string;
  // @Input() hero: string;

  private subscription: ISubscription;
  private subs: ISubscription;
  searchString:string;
  navigationSubscription;
  constructor(private responseData:responseData,private router:Router,private route: ActivatedRoute,private service:SearchServiceService,
    private MenuServiceService:MenuServiceService) 
  {
    /*
   this.navigationSubscription = this.router.events.subscribe((e: any) => {
    // If it is a NavigationEnd event re-initalise the component
    if (e instanceof NavigationEnd) {
      this.initialiseInvites();
    }
  });
  */ //temporarily commented - 25 Feb 2019



   }
/*
   initialiseInvites() {
    // Set default values and re-fetch any data you need.
    
  }*/

  ngOnInit() {
//if seach request is coming first time from dynamic munu component

    this.search = this.route.snapshot.params.item;
    this.onScrollDown(this.search);
// first reuuest ends here    

/*this.onScrollDown(this.search);
    this.subscription= this.MenuServiceService.getItem()
    .subscribe( 
        searchString=>
        {
          this.searchString = searchString; 
          this.pageindex=0;
          this.onScrollDown(this.searchString);
        });
*/  //temporarily commented 25 Feb 2019
  }
  
  ngOnDestroy(): void {
//this.subscription.unsubscribe();
  //  this.subs.unsubscribe();

  if (this.navigationSubscription) {  
    this.navigationSubscription.unsubscribe();
 }
  }



  public items: Array<any> = [];
  
  public onScrollDown(searchitem:string): void { 
    this.pageindex=this.pageindex+1;
  this.service.SearchItems(this.pageindex,this.pagesize,searchitem,(items)=>
  {

    this.count = items.count;
    if(this.items.length<this.count)
    {
     for(let i =0;i<items.count;i++ )
     {
       if( items.results[i].image1!=='undefined')
       items.results[i].image1 = 'data:image/jpeg;base64,' +  items.results[i].image1;
     }
      this.items = this.items.concat(items.results);
     console.log('search',this.items.length);
   } 
          
  });
}
 



}





