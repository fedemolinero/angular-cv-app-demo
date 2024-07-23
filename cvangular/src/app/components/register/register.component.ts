import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private registerSubscription: Subscription | undefined;
  registerForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }

  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    const username = this.username?.value;
    const password = this.password?.value;

    this.isLoading = true;
    this.errorMessage = undefined;

    this.registerSubscription = this.authService.register(username, password)
      .subscribe({
        next: (response: any) => {
          console.log('Registration successful', response);
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
        error: (e) => {
          console.error('Registration error', e);
          this.errorMessage = 'Registration failed. Please try again.'; // Mostrar mensaje de error
          this.isLoading = false;
        }
      });
  }

}
