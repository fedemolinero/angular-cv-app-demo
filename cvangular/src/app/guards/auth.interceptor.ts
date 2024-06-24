import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;

    // Añadir el token de autenticación si está disponible
    const authToken = this.authService.getToken();
    if (authToken) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
    }

    // Añadir cabeceras de contenido y idioma
    authReq = authReq.clone({
      headers: authReq.headers
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Accept-Language', 'en-US') // Puedes hacer esto dinámico según el idioma del usuario
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Manejar errores de autenticación (por ejemplo, redirigir al login)
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
