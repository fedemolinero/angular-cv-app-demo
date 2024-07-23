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

  private registerSubscription!: Subscription;
  registerForm!: FormGroup;

  loading: boolean = false;

  // Attempt control FE
  maxAttempts: number = 3;
  attempts: number = 0;
  disabledRegister: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initregisterForm();
    this.loadAttemptsFromStorage();
  }

  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }

  initregisterForm() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });
  }

  loadAttemptsFromStorage() {
    const storedAttempts = localStorage.getItem('loginAttempts');
    if (storedAttempts) {
      this.attempts = parseInt(storedAttempts, 10);
    }
  }

  saveAttemptsToStorage() {
    localStorage.setItem('loginAttempts', this.attempts.toString());
  }

  clearAttemptsFromStorage() {
    localStorage.removeItem('loginAttempts');
  }

  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }

  register() {

    if (this.disabledRegister || this.loading) {
      return;
    }

    this.loading = true; // Establecer estado de carga

    if (this.attempts >= this.maxAttempts) {
      this.disabledRegister = true;
      setTimeout(() => {
        this.attempts = 0;
        this.disabledRegister = false;
        this.clearAttemptsFromStorage(); // Limpiar intentos en el almacenamiento
        this.loading = false; // Restaurar estado de carga
      }, 60000); // Bloquea el inicio de sesión durante 1 minuto
      return;
    }

    this.registerSubscription = this.authService.login(
      this.registerForm.controls['username'].value,
      this.registerForm.controls['password'].value
    ).subscribe(
      {
        next: (response: any) => {
          console.log('Registration successful', response);
          this.loading = false;
          this.router.navigate(['/login']);
        },
        error: (error) => {

          // Si falla, incrementamos el contador de intentos
          this.attempts++;
          this.saveAttemptsToStorage(); // Guardar intentos en el almacenamiento
          // Mostrar mensaje de contraseña incorrecta y enfocar el campo de password
          if (error.status == 401) {
            this.registerForm.controls['password'].setErrors({ 'is-invalid': true });
          }
          this.loading = false; // Restaurar estado de carga en caso de error
        }
      }
    );
  }
}
