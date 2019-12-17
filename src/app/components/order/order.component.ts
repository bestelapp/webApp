import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../../services/order/order.service';
import {UserInfoService} from '../../services/user-info/user-info.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: Array<any> = [];
  @Input() claimUser = '';
  loggedInUser: { id: any; name: any; };

  constructor(private _order: OrderService, private _userInfoService: UserInfoService) { }

  ngOnInit() {
    this.getAllOrders();
    this.loggedInUser = this._userInfoService.getUser();
  }

  getAllOrders() {
    this._order.getAllOrders()
      .subscribe(res => {
        if (res !== null) {
          this.orders = [];
          for (const i in res) {
            if (res.hasOwnProperty(i)) {
              const user = {name: res[i].user.name};
              const products = this.getAllProducts(res[i].products);
              const id = res[i].id;
              let claimUser = null;
              if (res[i].claimUser != null) {
                claimUser = {name: res[i].claimUser.name};
              }
              this.orders.push({user, products, id, claimUser});
            }
          }
        }
      });
  }

  getAllProducts(productList) {
    const products = [];
    for (const p in productList) {
      if (productList.hasOwnProperty(p)) {
        products.push({name: productList[p].name});
      }
    }
    return products;
  }

  claimOrder(id: number) {
    const data = {
      id,
      claimUser: this._userInfoService.getUser()
    };
    this._order.claimOrder(data).subscribe(() => {
      this.getAllOrders();
    });
  }
}
