import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  constructor() { }

  getUser() {
    const token = localStorage.getItem('token');
    try {
      const decoded = jwt_decode(token);
      // @ts-ignore
      return {id: decoded.iss, name: decoded.sub};
    } catch (error) {
      return;
    }
  }
}
