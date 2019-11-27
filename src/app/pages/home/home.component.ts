import { Component, OnInit,Pipe, PipeTransform  } from '@angular/core';
import {SlidersComponent} from '../../pages/sliders/sliders.component';
import {ShoppingApiService} from '../../service/shopping-api.service';
import {responseData} from '../../model/pagedata'
import {BrowserModule, DomSanitizer, SafeHtml} from '@angular/platform-browser'
import {SearchServiceService} from '../../service/search-service.service';
import { LoadingIndicatorServiceService } from '../../service/loading-indicator-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
 
})


export class HomeComponent implements OnInit  {
  data:string;  
  loading:boolean=false;
  pageindex:number=0;
  pagesize:number=8;
  pageArray:any[];
  count:number;
  dynamicHtml:string;
  constructor(private responseData:responseData,private ShoppingApiService:ShoppingApiService,private service:SearchServiceService,private loadingIndicatorService: LoadingIndicatorServiceService) {
    loadingIndicatorService
    .onLoadingChanged
    .subscribe(isLoading => this.loading = isLoading);


  }


  ngOnInit() {
    this.itemsarr=[];
    this.onScrollDown();
 
  }


private  GetDynamicDiv(arr:any[])
{
  for(let item of arr)
  {
   
    this.data = this.data + "<ul>"
    this.data = this.data +  "<li id =" +item.itemid +">"
    this.data= this.data  + "<a  target='_blank' href='/itemDetail/" + item.itemid + "'>"
    this.data= this.data  + "<img src='"+ item.image + "' class='items' height='100px' width='100px'  />"
    this.data= this.data +  "</a>"
    this.data = this.data +  "<br clear='all' />"
    this.data = this.data +  "<div>"+ item.itemName + "</div>"
    this.data= this.data + "</li></ul>" 
    
  }

    return this.data;
}



toHTML(input) : any {
  


  return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
}

public itemsarr: Array<any> = [];
 
  public onScrollDown(): void {
  this.service.GetItems(this.pageindex,this.pagesize,(itemsarr)=>
  {
      this.count = itemsarr.count;
      // alert(itemsarr.count);
       
   
    
    if(this.itemsarr.length<this.count)
       {
        for(let i =0;i<itemsarr.count;i++ )
        {
          if( itemsarr.results[i].image1!=='undefined')
          itemsarr.results[i].image1 = 'data:image/jpeg;base64,' +  itemsarr.results[i].image1;
        }
         this.itemsarr = this.itemsarr.concat(itemsarr.results);
        console.log(this.itemsarr.length);
      }    
  });
}
}



