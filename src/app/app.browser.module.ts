import { HomepageComponent } from './home/homepage/homepage.component';
import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
 bootstrap: [HomepageComponent],

    imports:[
 BrowserModule.withServerTransition({appId: 'app-homepage'}),
 
 AppModule,
 
    ]
})
export class AppBrowserModule {}
