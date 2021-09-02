import { Observable } from 'rxjs';
import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    const url = environment.urlApi + 'api/auth/register';
    return this.http.post(url, user);
  }

  updateAddress(user: User): Observable<any> {
    const url = environment.urlApi + 'api/auth/update-address';
    return this.http.post(url, user);
  }

  updateProfile(user: User): Observable<any> {
    const url = environment.urlApi + 'api/auth/update-profile';
    return this.http.post(url, user);
  }

  profile(): Observable<any> {
    const url = environment.urlApi + 'api/auth/user-profile';
    return this.http.get(url, {});
  }

  imgProfile(form): Observable<any> {
    const url = environment.urlApi + 'api/auth/img-user-profile';
    return this.http.post(url, form);
  }
}

