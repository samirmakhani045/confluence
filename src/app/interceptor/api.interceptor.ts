import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   const startTime = (new Date()).getTime();
  //   return next.handle(request)
  //     .pipe(
  //       catchError((error: HttpErrorResponse) => {
  //         let errorMsg = '';
  //         if (error.error instanceof ErrorEvent) {
  //           console.log('This is client side error');
  //           errorMsg = `Error: ${error.error.message}`;
  //         } else {
  //           console.log('This is server side error');
  //           errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
  //         }
  //         console.log(errorMsg);
  //         return throwError(errorMsg);
  //       })
  //     )
  // }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('This is client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            console.log('This is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }

          if (error.status == 401) {
            this.authService.logout()
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }
}
