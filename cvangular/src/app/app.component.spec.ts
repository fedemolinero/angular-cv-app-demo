import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TemplateService } from './services/template.service';
import { AuthService } from './services/auth.service';
import { of, Subject } from 'rxjs';
import { Component } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { PopupComponent } from './components/shared/popup/popup.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { MainmenuComponent } from './components/mainmenu/mainmenu.component';
import { ColorTogglerComponent } from './components/shared/color-toggler/color-toggler.component';

@Component({ template: '' })
class DummyComponent { }

const routes: Routes = [
    { path: '', component: DummyComponent },
    { path: 'login', component: DummyComponent }
];

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let mockTemplateService: jasmine.SpyObj<TemplateService>;
    let mockAuthService: jasmine.SpyObj<AuthService>;
    let colorSubject: Subject<string>;
    let router: Router;


    beforeEach(async () => {
        // Crear un Subject para simular color$
        colorSubject = new Subject<string>();

        // Crear espías para los servicios
        const templateServiceSpy = jasmine.createSpyObj('TemplateService', ['color$']);
        const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticatedUser$']);

        // Configurar los valores por defecto para los espías
        authServiceSpy.isAuthenticatedUser$ = of(true);
        templateServiceSpy.color$ = colorSubject.asObservable(); 
        // Usar Subject como observable

        await TestBed.configureTestingModule({
            declarations: [AppComponent, PopupComponent, FooterComponent, MainmenuComponent, ColorTogglerComponent],
            imports: [
                RouterModule.forRoot(routes),
            ],
            providers: [
                { provide: TemplateService, useValue: templateServiceSpy },
                { provide: AuthService, useValue: authServiceSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize title correctly', () => {
        expect(component.title).toEqual('cvangular');
    });

});
