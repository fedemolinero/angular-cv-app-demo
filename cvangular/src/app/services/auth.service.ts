import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { ResponseModel } from '@app/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'fedeKpo';
  private apiUrl = 'http://localhost:3000';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  register(username: string, password: string): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.apiUrl}/api/auth/register`, { username, password })
      .pipe(
        catchError(this.handleError)
      );
  }

  login(username: string, password: string): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.apiUrl}/api/auth/login`, { username, password })
      .pipe(
        tap((response: ResponseModel) => {
          if (response.token) {
            this.setToken(response.token);
            this.isAuthenticatedSubject.next(true);
          }
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    this.removeToken();
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['']);
  }

  getToken(): string | null {
    return this.isLocalStorageAvailable() ? localStorage.getItem(this.tokenKey) : null;
  }

  setToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  removeToken(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  refreshToken(): Observable<string | null> {
    const refreshToken = this.getToken();

    if (!refreshToken) {
      // Manejar el caso cuando no hay refresh token disponible
      return throwError(() => 'No hay refresh token disponible') as Observable<string | null>;
    }

    return this.http.post<ResponseModel>(`${this.apiUrl}/api/auth/refresh-token`, { refreshToken })
      .pipe(
        catchError(error => {
          // Manejar errores de la solicitud
          console.error('Error al renovar el token:', error);
          return throwError('Error al renovar el token');
        }),
        tap((response: ResponseModel) => {
          if (response.token) {
            // Actualizar el token en el almacenamiento local
            this.setToken(response.token);
            this.isAuthenticatedSubject.next(true); // Indicar que el usuario está autenticado
          }
        }),
        // Mapear la respuesta para devolver solo el token o null si no hay token en la respuesta
        map((response: ResponseModel) => response.token ?? null)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
