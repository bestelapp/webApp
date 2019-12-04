import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post<any>(this._url + '/user/register', user);
  }

  loginUser(user) {
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
