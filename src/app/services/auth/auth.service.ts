import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Url } from '../url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _url = Url.url;

  constructor(private http: HttpClient) { }

  registerUser(user: object) {
    return this.http.post<any>(this._url + '/user/register', user);
  }

  loginUser(user: object) {
    return this.http.post<any>(this._url + '/user/login', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
