import {inject, Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {StorageService} from '../services/storage.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private localstorageService = inject(StorageService);
  private readonly router = inject(Router);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localstorageService.getToken();
    return next.handle(request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 401:
            this.router.navigateByUrl('/login').then();
            break;
          case 404:
            this.router.navigateByUrl('/not-found').then();
            break;
          case 400:
          case 500:
            this.router.navigateByUrl('/error').then();
            break;
          case 403:
            this.router.navigateByUrl('/forbidden').then();
            break;
        }
      }
      return throwError(() => error);
    }));
  }
}
