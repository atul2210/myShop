import { Component, OnInit,Pipe, PipeTransform  } from '@angular/core';
import { Slider } from 'ngx-slider';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {ShoppingApiService} from '../../service/shopping-api.service';
import {responseData} from '../../model/pagedata'
//import {BrowserModule, DomSanitizer, SafeHtml} from '@angular/platform-browser'



@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css'],
  providers: [NgbCarouselConfig]
})
export class SlidersComponent implements OnInit {
item;

  data:any;  
  public slider = new Slider(); //ngx slider
  
  imageItems:any[]=[];
  constructor(private config: NgbCarouselConfig, private shopapi:ShoppingApiService) { 
    /*ngx slider8*/
    this.slider.config.loop = true;
    this.slider.config.showPreview=true;
   // this.slider.config.transitionDuration = 1;
   
   // this.slider.config.previewWidth=20;
    this.slider.config.showTitle=false;
/*ngx sliders end*/
config.interval = 1000;
config.wrap = true;
config.keyboard = false;

//config.pauseOnHover = false;
// this.shopapi.getimages()
// .subscribe((m)=>
// {
//   this.item = m;
//   this.imageItems = this.item.body;
//   console.log(this.imageItems);
// },
// err=>{
// console.log(err);
 
// }
// );

// this.imageItems = [
//   'https://placeimg.com/600/600/any',
//   'https://placeimg.com/600/600/nature',
//   'https://placeimg.com/600/600/sepia',
//   'https://placeimg.com/600/600/people',
//   'https://placeimg.com/600/600/tech'
// ];
// this.imageItems = [
//   'https://placeimg.com/600/600/any',
//   'https://placeimg.com/600/600/nature',
//   'https://placeimg.com/600/600/sepia',
//   'https://placeimg.com/600/600/people',
//   'https://placeimg.com/600/600/tech'
// ];
this.slider.config.loop = true;
    this.slider.config.showPreview = false;
    this.slider.config.transitionDuration = 3;
this.imageItems = ['/assets/Pics/pic4.jpg',
'/assets/Pics/pic1.jpg',
'/assets/Pics/pic2.jpg',
'/assets/Pics/pic3.jpg'

];


  }

  ngOnInit() {

    const slideItems = [
      { src: "/assets/Pics/pic4.jpg", title: 'Title 1' },
      { src: '/assets/Pics/pic1.jpg', title: 'Title 2' },
      { src: '/assets/Pics/pic2.jpg', title: 'Title 3' },
      { src: '/assets/Pics/pic3.jpg', title: 'Title 4' }
  
    ];
    
    this.slider.items = slideItems; //ngx 
   


  }

}
