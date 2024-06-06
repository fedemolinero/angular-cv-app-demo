import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

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

    this.loginSubscription = this.authService.login(this.loginForm.controls['username'].value, this.loginForm.controls['username'].value)
      .subscribe(
        {
          next: (response: any) => {
            console.log('login successfull', response);
            this.router.navigate(['/cv']);
          },
          error: (e) => {
            console.error(e);
          }
        }
      );

  }

}
