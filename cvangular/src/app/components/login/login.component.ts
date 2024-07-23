import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  private loginSubscription!: Subscription;
  loginForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription?.unsubscribe();
    }
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      username: [{ value: '', disabled: false }, Validators.required],
      password: [{ value: '', disabled: false }, Validators.required],
    });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }


  login() {
    this.loginSubscription = this.authService.login(
      this.loginForm.controls['username'].value,
      this.loginForm.controls['password'].value
    ).subscribe(
      {
        next: (response: any) => {
          this.router.navigate(['/cv']);
        },
        error: (error) => {
          if (error === 'Unauthorized') {
            // Mostrar mensaje de contraseña incorrecta y enfocar el campo de password
            this.loginForm.controls['password'].setErrors({ 'is-invalid': true });
          } else {
            console.error(error);
          }
        }
      }
    );
  }
  

}
