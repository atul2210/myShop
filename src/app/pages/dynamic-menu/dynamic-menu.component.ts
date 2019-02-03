import { Component, OnInit,OnDestroy,Input } from '@angular/core';
import {MenuServiceService} from '../../service/menu/menu-service.service'
import { ISubscription } from 'rxjs/Subscription';
import { SearchResultComponent } from '../search-result/search-result.component';
import { SearchServiceService } from '../../service/search-service.service';
import { Router } from '@angular/router';
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
    this.router.navigateByUrl('/search/'+this.itemname);
    // this.pageindex = this.pageindex+1; //alert(this.pageindex);
    // this.pagesize=15;
    //   this.http.SearchResult(this.itemname,this.pageindex.toString(),this.pagesize.toString())
    //   .subscribe((res:Response)=>
    //   {
    //       this.items = res.body  
    //       console.log(this.items)
    //   });
   //this.search.getSearchResult(this.itemname);

  }


  public GetBootStrapMenuItems()
  {
    let isMainMenu:boolean=true;
    this.subs = this.service.menuitems()
    .subscribe((res)=>
    {
       this.menuitems = res.body;
       
       console.log(this.menuitems);
    });
  }



  public GetMenuItems()
  {
    let isMainMenu:boolean=true;
    this.subs = this.service.menuitems()
    .subscribe((res)=>
    {
      // this.menuitems = res.body;
    
      for (let item of res.body) {
        this.menuHtml= this.menuHtml + "<td style='width: 5%'> " 
        
        for (let subItem of item.children)
        {
           if(isMainMenu)
           { 
              this.menuHtml= this.menuHtml + "<button [matMenuTriggerFor]=" +item.mainMenuName+">"+item.menuName +"</button>";
              this.menuHtml= this.menuHtml + "<mat-menu "+item.mainTrigger+"='matMenu'>";
              this.menuHtml= this.menuHtml + " <button mat-menu-item [routerLink]='["+ subItem.routerLink +"]'>"+subItem.subMenuName+"</button>";
              isMainMenu = false;
           }
           else
           {
              this.menuHtml= this.menuHtml + "<button mat-menu-item [routerLink]='["+ subItem.routerLink +"]'>"+subItem.subMenuName+"</button>";
            }
        }
        this.menuHtml= this.menuHtml + "</mat-menu>" ;
        this.menuHtml = this.menuHtml +"</td>";
        //MatMenu.apply(this.menuHtml);
        isMainMenu=true;
      } 
      console.log(this.menuHtml);
      console.log(res.body);
   
  
    });
  }

ngOnDestroy()
{
  this.subscription.unsubscribe();
   
}

}
