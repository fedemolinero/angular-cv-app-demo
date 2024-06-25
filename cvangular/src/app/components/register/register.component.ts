import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  private registerSubscription!: Subscription;
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private popupService: PopupService
  ) { }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription?.unsubscribe();
    }
  }

  initRegisterForm() {
    this.registerForm = this.fb.group({
      username: [{ value: '', disabled: false }, Validators.required],
      password: [{ value: '', disabled: false }, Validators.required],
    });
  }

  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }


  register() {

    this.registerSubscription = this.authService.register(this.registerForm.controls['username'].value, this.registerForm.controls['username'].value)
      .subscribe(
        {
          next: (response: any) => {
            console.log('register successfull', response);
            this.router.navigate(['/login']);
          },
          error: (e) => {
            console.error(e);
          }
        }
      );

  }

}
