import { Role } from './../models/role';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './../models/user';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    const url = environment.urlApi + 'api/auth/login';
    return this.http.post(url, { email, password }).pipe(
      map((data: any) => {
        // login successful if there's a jwt token in the response
        if (data.state) {
          const user: User = new User();
          user.id = data.user.id;
          user.email = data.user.email;
          user.name = data.user.name;
          user.role = new Role();
          user.role.id = data.user.roles[0].id;
          user.role.name = data.user.roles[0].name;
          user.token = data.token;
          user.token_date = new Date().toLocaleString();

          if (data.user.img_profile !== null){
            user.img_profile = environment.urlApi + data.user.img_profile;
          }

          if (user && user.token) {
            this.startRefreshTokenTimer();
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('expire_in', data.expire_in);
            this.currentUserSubject.next(user);
          }
        }
        return data;
      })
    );
  }

  refreshUser(userRefresh: User): void {
    localStorage.setItem('currentUser', JSON.stringify(userRefresh));
    this.currentUserSubject.next(userRefresh);
  }

  logout() {
    // remove user from local storage to log user out
    const url = environment.urlApi + 'api/auth/logout';

    return this.http.post(url, {}).subscribe((data) => {
      this.stopRefreshTokenTimer();
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    });
  }

  logoutExpirate() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  refreshToken() {
    const url = environment.urlApi + 'api/auth/refresh';
    return this.http.post(url, {}).pipe(
      map((data: any) => {
        if (data.state) {
          const user: User = new User();
          user.id = data.user.id;
          user.email = data.user.email;
          user.name = data.user.name;
          user.role = new Role();
          user.role.id = data.user.roles[0].id;
          user.role.name = data.user.roles[0].name;
          user.token = data.token;
          user.token_date = new Date().toLocaleString();

          if (data.user.img_profile !== null) {
            user.img_profile = environment.urlApi + data.user.img_profile;
          }

          if (user && user.token) {
            this.startRefreshTokenTimer();
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('expire_in', data.expire_in);
            this.currentUserSubject.next(user);
          }
        }
      })
    );
  }

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    const seconds: number = Number(localStorage.getItem('expire_in'));
    const timeout = seconds * 1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
