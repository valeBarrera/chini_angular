import { AuthenticationService } from './../shared/authentication.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { parse, differenceInSeconds } from 'date-fns';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    let currentUser = this.authenticationService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = request.url.startsWith(environment.urlApi);

    if (isLoggedIn && isApiUrl) {
      const timeToken = parse(currentUser.token_date, 'd/M/yyyy HH:mm:ss', new Date());
      const expire: number = Number(localStorage.getItem('expire_in'));
      const now = new Date();
      if (differenceInSeconds(now, timeToken) > expire) {
        this.authenticationService.logoutExpirate();
        localStorage.setItem('is_expirated', 'true');
        this.router.navigate(['/login']);
        return;
      } else {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
        return next.handle(request);
      }
    }else{
      return next.handle(request);
    }
  }
}
