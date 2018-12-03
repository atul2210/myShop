import { Component, OnInit,Pipe, PipeTransform  } from '@angular/core';
import { Slider } from 'ngx-slider';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {ShoppingApiService} from '../../service/shopping-api.service';
import {responseData} from '../../model/pagedata'
//import {BrowserModule, DomSanitizer, SafeHtml} from '@angular/platform-browser'



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
// @Pipe({name: 'safeHtml'})

export class HomeComponent implements OnInit  {
  data:string;  
  public slider = new Slider(); //ngx slider
  imageItems:any[];
  pageindex:number=0;
  pagesize:number=0;
  pageArray:any[];
  count:number;
  dynamicHtml:string;
  constructor(private responseData:responseData,private config: NgbCarouselConfig,
  private ShoppingApiService:ShoppingApiService) {
    /*ngx slider8*/
    this.slider.config.loop = true;
    this.slider.config.showPreview=true;
    this.slider.config.transitionDuration = 1;
    this.slider.config.previewWidth=20;
    this.slider.config.showTitle=false;
/*ngx sliders end*/
config.interval = 1000;
config.wrap = true;
config.keyboard = false;

//config.pauseOnHover = false;


this.imageItems = [
  'https://placeimg.com/600/600/any',
  'https://placeimg.com/600/600/nature',
  'https://placeimg.com/600/600/sepia',
  'https://placeimg.com/600/600/people',
  'https://placeimg.com/600/600/tech'
];


  }


  ngOnInit() {
     const slideItems = [
    { src: 'https://placeimg.com/600/600/any', title: 'Title 1' },
    { src: 'https://placeimg.com/600/600/nature', title: 'Title 2' },
    { src: 'https://placeimg.com/600/600/sepia', title: 'Title 3' },
    { src: 'https://placeimg.com/600/600/people', title: 'Title 4' },
    { src: 'https://placeimg.com/600/600/tech', title: 'Title 5' }
  ];

  this.slider.items = slideItems; //ngx 
 
  this.GetPageResult();



// // //courcel
// //      const imageSources: string[] = [
// //      'https://placeimg.com/600/600/any',
// //      'https://placeimg.com/600/600/nature',
// //      'https://placeimg.com/600/600/sepia',
// //      'https://placeimg.com/600/600/people',
// //      'https://placeimg.com/600/600/tech'
// //   ];

// //   const config: ICarouselConfig = {
// //     verifyBeforeLoad: true,
// //     log: false,
// //     animation: true,
// //     animationType: AnimationConfig.SLIDE,
// //     autoplay: true,
// //     autoplayDelay: 2000,
// //     stopAutoplayMinWidth: 768
// //   };
  }

public GetPageResult()
{
  this.pageindex = this.pageindex+1; //alert(this.pageindex);
  this.pagesize=15;  
  this.ShoppingApiService.GetHomePageItems(this.pagesize.toString(),this.pageindex.toString())
  .subscribe((res)=>
  {
    //this.responseData= res
      this.responseData.Results = res.body.results
      this.responseData.Count= res.body.count
    //  this.pageArray= this.responseData.Results   //this.putinArray(this.responseData.Results)
      this.dynamicHtml = this.GetDynamicDiv(this.responseData.Results);
    this.count= this.responseData.Count
   // alert(this.dynamicHtml);
  })
}


private  GetDynamicDiv(arr:any[])
{
  for(let item of arr)
  {
   
    //this.data = this.data + "<div id=img" + item.itemid +  ">"
    this.data = this.data + "<ul>"
    this.data = this.data +  "<li id =" +item.itemid +">"
    this.data= this.data  + "<a  target='_blank' href='/itemDetail/" + item.itemid + "'>"
    this.data= this.data  + "<img src='"+ item.image + "' class='items' height='100px' width='100px'  />"
    this.data= this.data +  "</a>"
    this.data = this.data +  "<br clear='all' />"
    this.data = this.data +  "<div>"+ item.itemName + "</div>"
    //this.data = this.data +  "<div>"+ item.itemName + "</div>"
    this.data= this.data + "</li></ul>" 
    // </div>"
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



