import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();

    if (authToken) {
      req = this.addToken(req, authToken);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(req, next);
        } else {
          return throwError(() => error); // Utilizar función de fábrica para crear el error
        }
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string | null): HttpRequest<any> {
    if (token) {
      return req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });
    }
    return req; // Si no hay token, devolver la solicitud original sin modificar
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((newToken: any) => {
          if (newToken) {
            this.authService.setToken(newToken); // Actualizar el token en AuthService
            return next.handle(this.addToken(req, newToken));
          }

          // Si no se pudo obtener un nuevo token, manejar según la lógica de tu aplicación
          this.authService.logout(); // Cerrar sesión o manejar el error
          return throwError(() => new Error('No se pudo obtener un nuevo token'));
        }),
        catchError((error) => {
          // Manejar el error de refreshToken, por ejemplo, cerrar sesión o manejar de acuerdo a la lógica de tu aplicación
          this.authService.logout(); 
          return throwError(() => error);
        }),
        finalize(() => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(null);
        })
      );
    } else {
      // Esperar a que se complete la solicitud de refreshToken antes de repetir la solicitud original
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap(() => next.handle(this.addToken(req, this.authService.getToken())))
      );
    }
  }
}
