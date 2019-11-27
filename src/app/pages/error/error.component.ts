import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  message:string = null;
  backc:string=null;
  mobi:number;
  constructor(private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {

   this.message  = this.activatedRoute.snapshot.params["message"];
   this.backc = this.activatedRoute.snapshot.params["compo"];
   this.mobi=this.activatedRoute.snapshot.params["mobi"];
  }

  previouspage()
  {
    if(this.backc=="regis")
    {
     
      this.router.navigateByUrl("/registration/"+this.mobi);
    }
    if(this.backc=="logi")
    {
     
      this.router.navigateByUrl("/login");
    }

  }

}
