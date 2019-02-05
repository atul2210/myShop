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
  data:string;  
  public slider = new Slider(); //ngx slider
  imageItems:any[];
  constructor(private config: NgbCarouselConfig) { 
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
   


  }

}
