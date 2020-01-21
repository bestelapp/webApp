import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';

@Component({
  selector: 'app-orders-claimed',
  templateUrl: './orders-claimed.component.html',
  styleUrls: ['./orders-claimed.component.css']
})
export class OrdersClaimedComponent implements OnInit {

  @Input() price: object = {};
  orders: any[] = [];
  loggedInUser: { id: any; name: any; };

  constructor(private _order: OrderService, private _userInfoService: UserInfoService) { }

  ngOnInit() {
    this.loggedInUser = this._userInfoService.getUser();
    this.getAllByClaimUser();
  }
  getAllByClaimUser() {
    this._order.getAllByClaimUser(this.loggedInUser.id).subscribe(
      res => {
        if (res !== null) {
          this.orders = res;
        }
      },
      err => this.orders = []
    );
  }

  closeOrder(id: number) {
    this.orders[id].price = this.price[id];
    this._order.closeOrder(this.orders[id]).subscribe(
      res => {
        if (res) {
          this.getAllByClaimUser();
        }
      }
    );
  }
}
