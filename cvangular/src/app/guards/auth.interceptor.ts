import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service'; // Asegúrate de ajustar la ruta al servicio AuthService si es necesario
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token de autenticación
    const authToken = this.authService.getToken();

    // Clonar la solicitud original para agregar el token de autorización si está disponible
    let authReq = req;
    if (authToken) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json', // Puedes ajustar según tus necesidades
          Accept: 'application/json', // Puedes ajustar según tus necesidades
          'Accept-Language': 'en-US' // Puedes hacer esto dinámico según el idioma del usuario
        }
      });
    } else {
      // Si no hay token, se puede hacer algo aquí (depende de tu lógica de manejo de sesiones)
    }

    // Manejar la solicitud modificada o no modificada
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Manejar errores de autenticación (por ejemplo, redirigir al login)
          this.authService.logout(); // Método de tu servicio AuthService para limpiar la sesión
          this.router.navigate(['/login']); // Redirigir al usuario al inicio de sesión
        }
        return throwError(error); // Propagar el error hacia arriba
      })
    );
  }
}
