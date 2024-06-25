// error-interceptor.service.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PopupService } from './services/popup.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private popupService: PopupService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.popupService.setShowPopup(true);
        return throwError(() => new Error(error.message));
      })
    );
  }
}
