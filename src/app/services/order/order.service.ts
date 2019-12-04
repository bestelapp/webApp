import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _url = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllOrders() {
    return this.http.get<any>(this._url + '/order/all');
  }

  claimOrder(data) {
    return this.http.post(this._url + '/order/claim', data);
  }

  create(order) {
    return this.http.post(this._url + '/order/create', order);
  }
}
