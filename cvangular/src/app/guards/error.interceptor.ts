// error-interceptor.service.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PopupService } from '../services/popup.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private popupService: PopupService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';
        
        if (error.error instanceof ErrorEvent) {
          // Error de cliente, como un error de red
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Error del servidor
          errorMessage = this.getServerErrorMessage(error);
        }
        
        // Mostrar mensaje de error al usuario
        this.popupService.addErrorMessage(errorMessage);

        // Retornar un error observable con un mensaje útil para el manejo en otros lugares
        return throwError(errorMessage);
      })
    );
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 401:
        return 'Unauthorized';
      case 404:
        return 'Not found';
      default:
        return `Server error: ${error.message}`;
    }
  }
}
