import { Component, OnInit,OnDestroy } from '@angular/core';
import {MenuServiceService} from '../../service/menu/menu-service.service'
import { ISubscription } from 'rxjs/Subscription';
import { SearchResultComponent } from '../search-result/search-result.component';
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
  
  toHTML(input) : any {
    return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
}

  constructor(private service:MenuServiceService,private search : SearchResultComponent) { }

  ngOnInit() {
///    this.GetMenuItems();
  this.GetBootStrapMenuItems()
  
  }

  searchResult()
  {
    this.search.getSearchResult(this.itemname);

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
