// import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';
// import { LoginComponent } from './login.component';
// import { AuthService } from '@services/auth.service';
// import { of, throwError } from 'rxjs';
// import { LoadingComponent } from '../../shared/loading/loading.component';
// import { By } from '@angular/platform-browser';
// import { LoginTimeoutComponent } from '../../shared/login-timeout/login-timeout.component';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let authService: jasmine.SpyObj<AuthService>;

//   beforeEach(async () => {
//     authService = jasmine.createSpyObj('AuthService', ['login']);

//     await TestBed.configureTestingModule({
//       declarations: [LoginComponent, LoadingComponent, LoginTimeoutComponent],
//       imports: [ReactiveFormsModule],
//       providers: [
//         { provide: AuthService, useValue: authService }
//       ]
//     })
//       .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   afterEach(() => {
//     localStorage.removeItem('loginAttempts');
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should not attempt login if disabledLogin is true', () => {
//     component.disabledLogin = true;

//     component.login();

//     expect(authService.login).not.toHaveBeenCalled();
//   });

//   it('should not attempt login if loading is true', () => {
//     component.loading = true;

//     component.login();

//     expect(authService.login).not.toHaveBeenCalled();
//   });

//   it('should create the login form with controls', () => {
//     expect(component.loginForm).toBeTruthy();
//     expect(component.loginForm.get('username')).toBeTruthy();
//     expect(component.loginForm.get('password')).toBeTruthy();
//   });

//   it('should validate username field', () => {
//     let username = component.loginForm.get('username');
//     username?.setValue(''); // Valor vacío
//     expect(username?.valid).toBeFalsy();

//     username?.setValue('userasd'); // Valor válido
//     expect(username?.valid).toBeTruthy();

//   });


//   it('should validate password field', () => {
//     let password = component.loginForm.get('password');
//     password?.setValue(''); // Valor vacío
//     expect(password?.valid).toBeFalsy();

//     password?.setValue('passwordP1  '); // Valor válido
//     expect(password?.valid).toBeTruthy();

//     // Agregar más pruebas de validación según sea necesario
//   });


//   it('should initialize form with default values', () => {
//     expect(component.loginForm).toBeDefined();
//     expect(component.loginForm.get('username')?.value).toBe('');
//     expect(component.loginForm.get('password')?.value).toBe('');
//   });

//   it('should show error message for invalid username', () => {
//     let username = component.loginForm.get('username');
//     username?.setValue('');
//     username?.markAsTouched();

//     fixture.detectChanges();

//     let errorMessage = fixture.debugElement.query(By.css('#validationRequiredUsernameFeedback')).nativeElement;
//     expect(errorMessage.textContent).toContain('Username is required.');
//   });

//   it('should show loading component when loading is true', () => {
//     component.loading = true;
//     fixture.detectChanges();

//     let loadingComponent = fixture.debugElement.query(By.directive(LoadingComponent));
//     expect(loadingComponent).toBeTruthy();
//   });

//   it('should disable login button when form is invalid or login is disabled', () => {
//     let loginButton = fixture.debugElement.query(By.css('#loginButton')).nativeElement;
//     let form = fixture.debugElement.query(By.css('form')).nativeElement;

//     component.loginForm.setValue({
//       username: 'testuser',
//       password: 'testpasswordP1'
//     });

//     fixture.detectChanges();

//     expect(loginButton.disabled).toBeFalsy();

//     component.disabledLogin = true;
//     fixture.detectChanges();

//     expect(loginButton.disabled).toBeTruthy();
//   });


//   it('should display minlength error when username or password is too short', () => {
//     const usernameInput = fixture.nativeElement.querySelector('#username');
//     const passwordInput = fixture.nativeElement.querySelector('#password');

//     usernameInput.value = 'abc';
//     passwordInput.value = '123';

//     usernameInput.dispatchEvent(new Event('input'));
//     usernameInput.dispatchEvent(new Event('blur'));

//     passwordInput.dispatchEvent(new Event('input'));
//     passwordInput.dispatchEvent(new Event('blur'));

//     fixture.detectChanges();

//     const usernameError = fixture.nativeElement.querySelector('#validationMinUsernameFeedback');
//     const passwordError = fixture.nativeElement.querySelector('#validationMinPasswordFeedback');

//     expect(usernameError.textContent).toContain('Username must be at least 6 characters long.');
//     expect(passwordError.textContent).toContain('Password must be at least 6 characters long.');
//   });


//   it('should call login method on form submission', () => {
//     spyOn(component, 'login');

//     component.loginForm.setValue({
//       username: 'testuser',
//       password: 'testpasswordP1'
//     });

//     let form = fixture.debugElement.query(By.css('form')).nativeElement;
//     form.dispatchEvent(new Event('submit'));

//     expect(component.login).toHaveBeenCalled();
//   });

//   it('should disable login and reset attempts after max attempts', fakeAsync(() => {
//     component.maxAttempts = 3;
//     component.attempts = 3;
//     authService.login.and.returnValue(throwError({ status: 401 }));

//     component.login();

//     expect(component.disabledLogin).toBeTruthy();
//     tick(60000); // Avanzar el tiempo en 1 minuto
//     expect(component.disabledLogin).toBeFalsy();
//     expect(component.attempts).toBe(0);
//   }));


// });
