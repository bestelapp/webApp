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
    return this.http.get<any[]>(this._url + '/group/all');
  }

  getById(id: number) {
    return this.http.get<{id: number, name: string, owner: object, users: any[]}>(this._url + '/group/' + id);
  }

  create(group: object) {
    return this.http.post(this._url + '/group/create', group);
  }

  getAllUsersByName(id: number, name: string) {
    return this.http.post(this._url + '/group/users/' + id, name);
  }

  addUsersToGroup(id: number, user: object) {
    return this.http.post<boolean>(this._url + '/group/addUser/' + id, user)
  }

  removeUserFromGroup(id: number, user: object) {
    return this.http.post<boolean>(this._url + '/group/removeUser/' + id, user)
  }
}
