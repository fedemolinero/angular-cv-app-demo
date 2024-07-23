// error-interceptor.service.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PopupService } from '../services/popup.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private popupService: PopupService,
    private authService: AuthService // Inyecta el servicio de autenticación
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Interceptor Error:', error);

        let errorMessage = 'An unknown error occurred';

        if (error.error instanceof ErrorEvent) {
          // Error de cliente, como un error de red
          errorMessage = `Error: ${error.error.message}`;
        
        } else {
          // Error del servidor
          errorMessage = this.getServerErrorMessage(error);

          if (error.status === 401) {
            // En este ejemplo, mostramos un mensaje usando el PopupService
            errorMessage = 'Session expired. Please log in again.';
            
          }

        }

        // Mostrar mensaje de error al usuario
        this.popupService.addErrorMessage(errorMessage);

        // Retornar un error observable con un mensaje útil para el manejo en otros lugares
        return throwError(() => errorMessage);
      })
    );
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0:
        return 'Server Offline. Try Again in a few minutes';
      case 401:
        return 'Unauthorized';
      case 404:
        return 'Not found';
      default:
        return `Server error: ${error.message}`;
    }
  }
}
