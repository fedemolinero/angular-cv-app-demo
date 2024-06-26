import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { MainmenuComponent } from './components/mainmenu/mainmenu.component';
import { CvPreviewComponent } from './components/cvpreview/cvpreview.component';
import { CvformComponent } from './components/cvform/cvform.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PopupComponent } from './components/popup/popup.component';
import { PopupService } from './services/popup.service';
import { ErrorInterceptor } from './guards/error.interceptor';
import { ColorTogglerComponent } from './components/color-toggler/color-toggler.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    MainmenuComponent,
    CvPreviewComponent,
    CvformComponent,
    LoginComponent,
    RegisterComponent,
    PopupComponent,

    CapitalizePipe,
    ColorTogglerComponent,
    FooterComponent,
    TooltipDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    PopupService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
