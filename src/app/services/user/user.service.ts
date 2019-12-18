import { Injectable } from '@angular/core';
import { Url } from '../url';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url = Url.url;

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<any[]>(this._url + '/user/all');
  }
}
