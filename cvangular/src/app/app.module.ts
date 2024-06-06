import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { DataWrapperComponent } from './data-wrapper/data-wrapper.component';
import { MainmenuComponent } from './mainmenu/mainmenu.component';
import { CvPreviewComponent } from './cvpreview/cvpreview.component';
import { CvformComponent } from './cvform/cvform.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CapitalizePipe } from './capitalize.pipe';
import { HighlightDirective } from './highlight.directive';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    DataWrapperComponent,
    MainmenuComponent,
    CvPreviewComponent,
    CvformComponent,
    CapitalizePipe,
    HighlightDirective,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
