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
import { PopupService } from '@services/popup.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private popupService: PopupService
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
          // Client error as network error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server error
          errorMessage = this.getServerErrorMessage(error);

          if (error.status === 401) {
            // In this demo, show a message using PopUpService.
            errorMessage = 'Session expired. Please log in again.';
            // Other logic here
          }
        }

        // Show message to user
        this.popupService.addErrorMessage(errorMessage);

        // Return error observable with a message.
        return throwError(() => error);
      })
    );
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0:
        return 'Server Offline. Try Again in a few minutes';
      case 401:
        return 'Unauthorized';
      case 403:
        return 'Forbidden'; // Agregado para manejar errores de acceso prohibido
      case 404:
        return 'Not found';
      default:
        return `Server error: ${error.message}`;
    }
  }
}
