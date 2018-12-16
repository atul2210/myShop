import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import {ShoppingApiService} from '../app/service/shopping-api.service';
import { HomepageComponent } from './home/homepage/homepage.component'
import { RouterModule,CanActivate } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponentComponent } from './page-not-found/page-not-found-component/page-not-found-component.component';
import {Globals} from './model/global'
import { ItemdetailsComponent } from './pages/itemdetails/itemdetails.component';
import { LoginComponent } from './pages/login/login.component';
import {serviceintercepter} from './service/sevice-intercepter';
import {authguard} from '../app/service/auth-guard';
import { CheckinComponent } from './pages/checkin/checkin.component';
import { SliderModule } from 'ngx-slider';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {responseData} from './model/pagedata';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { SafePipe } from './safe.pipe';
import { CartItemServiceService } from './service/cart-item-service.service';
import { itemNotify } from './pages/itemdetails/item-notify';
import {HttpXsrfInterceptor} from './service/httpXsrfIntercepter';
import { SearchResultComponent } from './pages/search-result/search-result.component';
import {LoadingIndicatorInterceptor,LoadingIndicatorServiceService} from '../../src/app/service/loading-indicator-service.service'
import {MenuServiceService} from './service/menu/menu-service.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomepageComponent,
    WelcomeComponent,
    PageNotFoundComponentComponent,
    ItemdetailsComponent,
    LoginComponent,
    CheckinComponent,
    UserRegistrationComponent,
    SafePipe,
    SearchResultComponent
   
    
    
   
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,HttpClientModule,RouterModule,
    RouterModule.forRoot([
       {path:'',redirectTo:'HomeComponent',pathMatch:'full'},
      {path:'login',component:LoginComponent},
      {path:'welcome',component:WelcomeComponent},
      {path:'HomeComponent',component:HomeComponent},
      {path:'women/:category/:pageindex',component:AppComponent},
      {path:'men/:category/:pageindex',component:AppComponent},
      {path:'kids/:category/:pageindex',component:AppComponent},
      {path:'home',component:HomepageComponent},
      {path:'itemDetail/:itemid',component:ItemdetailsComponent},
      // {path:'itemDetail/:itemid',component:ItemdetailsComponent,canActivate:[authguard]},

      {path:'checkin',component:CheckinComponent},
      {path:'registration/:mobile',component:UserRegistrationComponent},
      {path:'search/:item',component:SearchResultComponent},
      {path:'**',component:PageNotFoundComponentComponent}
  
      ]),
      SliderModule,

    NgbModule,
    NgxImageZoomModule.forRoot(),
    InfiniteScrollModule,
    FormsModule
    
  ],
  providers: [ShoppingApiService,Globals,
    ShoppingApiService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:serviceintercepter,
     
      multi:true
  
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HttpXsrfInterceptor,
     
      multi:true
  
    },
    LoadingIndicatorServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (service: LoadingIndicatorServiceService) => new LoadingIndicatorInterceptor(service),
      multi: true,
      deps: [LoadingIndicatorServiceService]
    },
    MenuServiceService,
    authguard,responseData, CartItemServiceService,itemNotify,SearchResultComponent ],
  
  bootstrap: [HomepageComponent]
})
export class AppModule { }
