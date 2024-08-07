// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { MainmenuComponent } from './mainmenu.component';
// import { AuthService } from '@services/auth.service';
// import { Component } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { By } from '@angular/platform-browser';
// import { ColorTogglerComponent } from '../shared/color-toggler/color-toggler.component';

// @Component({ template: '' })
// class DummyComponent { }

// const routes: Routes = [
//     { path: '', component: DummyComponent },
//     { path: 'login', component: DummyComponent }
// ];

// describe('MainmenuComponent', () => {
//     let component: MainmenuComponent;
//     let fixture: ComponentFixture<MainmenuComponent>;
//     let authServiceSpy: jasmine.SpyObj<AuthService>;
//     let router: Router;

//     beforeEach(async () => {
//         const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['logout']);

//         await TestBed.configureTestingModule({
//             declarations: [MainmenuComponent, DummyComponent, ColorTogglerComponent],
//             imports: [
//                 RouterModule.forRoot(routes),
//             ],
//             providers: [
//                 { provide: AuthService, useValue: authServiceSpyObj } // Proveemos el spy del AuthService
//             ]
//         }).compileComponents();

//         authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>; // Injectamos el spy
//         router = TestBed.inject(Router); // Injectamos el Router
//     });

//     beforeEach(() => {
//         fixture = TestBed.createComponent(MainmenuComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });

//     it('should navigate to home when Home button is clicked and user is not authenticated', () => {
//         spyOn(router, 'navigate');
//         component.isAuthenticated = false;
//         fixture.detectChanges();
//         const homeButton = fixture.debugElement.query(By.css('.btn-outline-success'));

//         homeButton.triggerEventHandler('click', null);
//         expect(router.navigate).toHaveBeenCalledWith(['']);
//     });

//     it('should navigate to login when Login button is clicked and user is not authenticated', () => {
//         spyOn(router, 'navigate');
//         component.isAuthenticated = false;
//         fixture.detectChanges();
//         const loginButton = fixture.debugElement.query(By.css('.btn-outline-secondary'));

//         loginButton.triggerEventHandler('click', null);
//         expect(router.navigate).toHaveBeenCalledWith(['login']);
//     });

//     it('should call AuthService.logout() when Logout button is clicked and user is authenticated', () => {
//         component.isAuthenticated = true;
//         fixture.detectChanges();
//         const logoutButton = fixture.debugElement.query(By.css('.btn-outline-secondary'));

//         logoutButton.triggerEventHandler('click', null);
//         expect(authServiceSpy.logout).toHaveBeenCalled();
//     });

// });
