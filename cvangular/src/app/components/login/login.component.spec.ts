// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';
// import { LoginComponent } from './login.component';
// import { AuthService } from '@services/auth.service';
// import { of } from 'rxjs';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let authService: jasmine.SpyObj<AuthService>;

//   beforeEach(async () => {
//     authService = jasmine.createSpyObj('AuthService', ['login']);

//     await TestBed.configureTestingModule({
//       declarations: [LoginComponent],
//       imports: [ReactiveFormsModule, RouterTestingModule],
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

//   it('should initialize form with default values', () => {
//     expect(component.loginForm).toBeDefined();
//     expect(component.loginForm.get('username')?.value).toBe('');
//     expect(component.loginForm.get('password')?.value).toBe('');
//   });

//   it('should display required error when form is submitted with empty username and password', () => {
//     const loginButton = fixture.nativeElement.querySelector('button[type="submit"]');
//     loginButton.click();
//     fixture.detectChanges();

//     const usernameError = fixture.nativeElement.querySelector('#validationUsernameFeedback');
//     const passwordError = fixture.nativeElement.querySelector('#validationPasswordFeedback');

//     expect(usernameError.textContent).toContain('Username is required.');
//     expect(passwordError.textContent).toContain('Password is required.');
//   });

//   it('should display minlength error when username or password is too short', () => {
//     const usernameInput = fixture.nativeElement.querySelector('#username');
//     const passwordInput = fixture.nativeElement.querySelector('#password');

//     usernameInput.value = 'abc';
//     passwordInput.value = '123';
//     usernameInput.dispatchEvent(new Event('input'));
//     passwordInput.dispatchEvent(new Event('input'));
//     fixture.detectChanges();

//     const usernameError = fixture.nativeElement.querySelector('#validationUsernameFeedback');
//     const passwordError = fixture.nativeElement.querySelector('#validationPasswordFeedback');

//     expect(usernameError.textContent).toContain('Username must be at least 6 characters long.');
//     expect(passwordError.textContent).toContain('Password must be at least 6 characters long.');
//   });

//   it('should disable login button when form is invalid', () => {
//     const loginButton = fixture.nativeElement.querySelector('button[type="submit"]');
//     expect(loginButton.disabled).toBeTruthy();

//     component.loginForm.patchValue({
//       username: 'testuser',
//       password: 'testpass'
//     });
//     fixture.detectChanges();

//     expect(loginButton.disabled).toBeFalsy();
//   });

//   it('should call AuthService.login when form is submitted with valid credentials', () => {
//     const loginButton = fixture.nativeElement.querySelector('button[type="submit"]');
//     const usernameInput = fixture.nativeElement.querySelector('#username');
//     const passwordInput = fixture.nativeElement.querySelector('#password');

//     usernameInput.value = 'testuser';
//     passwordInput.value = 'testpass';
//     usernameInput.dispatchEvent(new Event('input'));
//     passwordInput.dispatchEvent(new Event('input'));
//     fixture.detectChanges();

//     spyOn(component, 'login').and.callThrough();

//     authService.login.and.returnValue(of({ token: '' }));
//     loginButton.click();
//     fixture.detectChanges();

//     expect(component.login).toHaveBeenCalled();
//     expect(authService.login).toHaveBeenCalledWith('testuser', 'testpass');
//   });

//   it('should handle login error and increment attempts', () => {
//     const loginButton = fixture.nativeElement.querySelector('button[type="submit"]');
//     const usernameInput = fixture.nativeElement.querySelector('#username');
//     const passwordInput = fixture.nativeElement.querySelector('#password');

//     usernameInput.value = 'testuser';
//     passwordInput.value = 'testpass';
//     usernameInput.dispatchEvent(new Event('input'));
//     passwordInput.dispatchEvent(new Event('input'));
//     fixture.detectChanges();

//     authService.login.and.returnValue(of({ token: '' }));
//     loginButton.click();
//     fixture.detectChanges();

//     authService.login.and.returnValue(of({ token: '', error: { status: 401 } }));
//     loginButton.click();
//     fixture.detectChanges();

//     const passwordError = fixture.nativeElement.querySelector('#validationPasswordFeedback');
//     expect(passwordError.textContent).toContain('Invalid password.');
//     expect(component.attempts).toBe(1);
//   });

//   it('should disable login after max attempts and re-enable after timeout', async () => {
//     const loginButton = fixture.nativeElement.querySelector('button[type="submit"]');
//     const usernameInput = fixture.nativeElement.querySelector('#username');
//     const passwordInput = fixture.nativeElement.querySelector('#password');

//     component.maxAttempts = 3;

//     for (let i = 0; i < component.maxAttempts; i++) {
//       usernameInput.value = 'testuser';
//       passwordInput.value = 'testpass';
//       usernameInput.dispatchEvent(new Event('input'));
//       passwordInput.dispatchEvent(new Event('input'));
//       fixture.detectChanges();

//       authService.login.and.returnValue(of({ token: '', error: { status: 401 } }));
//       loginButton.click();
//       fixture.detectChanges();
//     }

//     expect(component.disabledLogin).toBeTruthy();

//     await new Promise(resolve => setTimeout(resolve, 60000)); // Wait for timeout
//     fixture.detectChanges();

//     expect(component.disabledLogin).toBeFalsy();
//   });
// });
