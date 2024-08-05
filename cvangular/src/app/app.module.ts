import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { MainmenuComponent } from './components/mainmenu/mainmenu.component';
import { CvPreviewComponent } from './components/layout/cvpreview/cvpreview.component';
import { CvformComponent } from './components/layout/cvform/cvform.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { LoginComponent } from './components/layout/login/login.component';
import { RegisterComponent } from './components/layout/register/register.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/layout/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PopupComponent } from './components/shared/popup/popup.component';
import { PopupService } from './services/popup.service';
import { ErrorInterceptor } from './guards/error.interceptor';
import { ColorTogglerComponent } from './components/shared/color-toggler/color-toggler.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/layout/footer/footer.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { ButtontogglerComponent } from './components/shared/buttontoggler/buttontoggler.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { LoginTimeoutComponent } from './components/shared/login-timeout/login-timeout.component';
import { TestComponent } from './components/shared/test/test.component';
import { NotfoundComponent } from './components/layout/notfound/notfound.component';
import { TridimensionComponent } from './components/shared/tridimension/tridimension.component';
import { YesnotogglerComponent } from './components/shared/yesnotoggler/yesnotoggler.component';
import { InputGameComponent } from './components/shared/input-game/input-game.component';
import { RedbuttonComponent } from './components/shared/redbutton/redbutton.component';
import { CvlistComponent } from './components/layout/cvlist/cvlist.component';
import { PatternCrazyComponent } from './components/shared/pattern-crazy/pattern-crazy.component';

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
    TooltipDirective,
    ButtontogglerComponent,
    LoadingComponent,
    LoginTimeoutComponent,
    TestComponent,
    NotfoundComponent,
    TridimensionComponent,
    YesnotogglerComponent,
    InputGameComponent,
    RedbuttonComponent,
    CvlistComponent,
    PatternCrazyComponent,
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
