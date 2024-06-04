import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { DataWrapperComponent } from './data-wrapper/data-wrapper.component';
import { MainmenuComponent } from './mainmenu/mainmenu.component';

@NgModule({
  declarations: [
    AppComponent,
    DataWrapperComponent,
    MainmenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
