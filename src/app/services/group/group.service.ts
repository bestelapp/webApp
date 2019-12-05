import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Url } from '../url';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private _url = Url.url;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(this._url + '/group/all');
  }

  getById(id) {
    return this.http.get(this._url + '/group/' + id);
  }

  create(group) {
    return this.http.post(this._url + '/group/create', group);
  }

  getAllUsersByName(id, name) {
    return this.http.post(this._url + '/group/users/' + id, name);
  }
}
