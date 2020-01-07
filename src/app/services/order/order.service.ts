import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Url } from '../url';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _url = Url.url;

  constructor(private http: HttpClient) { }

  getAllOrders() {
    return this.http.get<any>(this._url + '/order/all');
  }

  claimOrder(data: object) {
    return this.http.post(this._url + '/order/claim', data);
  }

  create(order: object, groupId: number) {
    return this.http.post(this._url + '/order/create/' + groupId, order);
  }
}
