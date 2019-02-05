import { Component, OnInit,Pipe, PipeTransform  } from '@angular/core';
import {SlidersComponent} from '../../pages/sliders/sliders.component';
import {ShoppingApiService} from '../../service/shopping-api.service';
import {responseData} from '../../model/pagedata'
import {BrowserModule, DomSanitizer, SafeHtml} from '@angular/platform-browser'



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
 
})


export class HomeComponent implements OnInit  {
  data:string;  

  pageindex:number=0;
  pagesize:number=0;
  pageArray:any[];
  count:number;
  dynamicHtml:string;
  constructor(private responseData:responseData,private ShoppingApiService:ShoppingApiService) {


  }


  ngOnInit() {
  
 
  this.GetPageResult();
  }

public GetPageResult()
{
  this.pageindex = this.pageindex+1; 
  this.pagesize=15;  
  this.ShoppingApiService.GetHomePageItems(this.pagesize.toString(),this.pageindex.toString())
  .subscribe((res)=>
  {
    
      this.responseData.Results = res.body.results
      this.responseData.Count= res.body.count
      this.dynamicHtml = this.GetDynamicDiv(this.responseData.Results);
    this.count= this.responseData.Count
   
  })
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





// private  putinArray(picarray:any[])
// {
//   let arr:any[];
//   for(let item of picarray)
//   {
//     arr.push[item];
    
//   }

//   return arr;


//   }


}



