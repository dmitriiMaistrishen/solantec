import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {TabViewModule} from 'primeng/tabview';


import { AppComponent } from './app.component';
import { TabContentComponent } from './tab-content/tab-content.component';
import { TabData } from './tabData.service';
import { TabContentData } from './tab-content/tabContentData.service';


@NgModule({
  declarations: [
    AppComponent,
    TabContentComponent
  ],
  imports: [
    BrowserModule,
    TabViewModule,
    HttpClientModule
  ],
  providers: [
  	TabData,
  	TabContentData
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
