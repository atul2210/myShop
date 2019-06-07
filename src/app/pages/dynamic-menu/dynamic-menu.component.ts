import { Component, OnInit,OnDestroy,Input } from '@angular/core';
import {MenuServiceService} from '../../service/menu/menu-service.service'
import { ISubscription } from 'rxjs/Subscription';
import { SearchResultComponent } from '../search-result/search-result.component';
import { SearchServiceService } from '../../service/search-service.service';
import { Router,NavigationEnd } from '@angular/router';
//import {MatButton,MatMenu,MatMenuTrigger} from '@angular/material';

@Component({
  selector: 'app-dynamic-menu',
  templateUrl: './dynamic-menu.component.html',
  styleUrls: ['./dynamic-menu.component.css'],
 
})
export class DynamicMenuComponent implements OnInit,OnDestroy {
  private subs: ISubscription;
  itemname:string;
  menuitems:string[];
  loading:boolean=false;
  menuHtml:string="";  private subscription: ISubscription;
  pageindex:number=0;
  pagesize:number=0;
  @Input() items:any;
  toHTML(input) : any {
    return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
}

  constructor(private router:Router,private http:SearchServiceService,private service:MenuServiceService,private search : SearchResultComponent) { }

  ngOnInit() {
///    this.GetMenuItems();
  this.GetBootStrapMenuItems()
  
  }

  searchResult()
  {
   // temporarily commented - 25 Feb 2019
   /// this.service.changeSelectedItem(this.itemname);
   ////temporirly commented end here
   
   
   this.router.navigateByUrl('/TempRouteSearch/'+this.itemname+'/search');
   
  
  
  }


  public GetBootStrapMenuItems()
  {
    let isMainMenu:boolean=true;
    this.subs = this.service.menuitems()
    .subscribe((res)=>
    {
       this.menuitems = res.body
       console.log('menu', res);
     
    });
  }



  
ngOnDestroy()
{
  this.subscription.unsubscribe();
   
}

}
