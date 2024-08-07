import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { ResponseModel } from '@app/models/response.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'fedeKpo';
  private apiUrl = 'http://localhost:3000';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isTokenValid());
  public isAuthenticatedUser$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) { }

  register(username: string, password: string): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.apiUrl}/api/auth/register`, { username, password })
      .pipe(
        catchError(this.handleError)
      );
  }

  login(username: string, password: string): Observable<ResponseModel> {
    return this.http
      .post<ResponseModel>(`${this.apiUrl}/api/auth/login`, { username, password })
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
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return this.isTokenValid();
  }

  refreshToken(): Observable<string | null> {
    const refreshToken = this.getToken();

    if (!refreshToken) {
      return throwError(() => 'No hay refresh token disponible') as Observable<string | null>;
    }

    return this.http.post<ResponseModel>(`${this.apiUrl}/api/auth/refresh-token`, { refreshToken })
      .pipe(
        catchError(error => {
          console.error('Error al renovar el token:', error);
          return throwError(() => 'Error al renovar el token');
        }),
        tap((response: ResponseModel) => {
          if (response.token) {
            this.setToken(response.token);
            this.isAuthenticatedSubject.next(true);
          }
        }),
        map((response: ResponseModel) => response.token ?? null)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }

  private isTokenValid(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }
}
