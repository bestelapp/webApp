import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserInfoService} from '../../services/user-info/user-info.service';
import {OrderService} from '../../services/order/order.service';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit, OnDestroy {

  private routeSub: Subscription;
  @Input() productName = '';
  products: Array<any> = [];
  id: number;

  constructor(private route: ActivatedRoute, private _order: OrderService, private _userInfoService: UserInfoService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params.id;
    });
  }

  onSubmitForm() {
    const u = this._userInfoService.getUser();
    if (this.products.length !== 0) {
      const order = { user: {name: u.name, id: u.id}, products: this.products};
      this._order.create(order, this.id).subscribe(() => {
        this.products = [];
      });
    }
  }

  addProduct() {
    if (this.productName !== '') {
      if (this.products.length !== 0) {
        let count = 0;
        this.products.forEach(product => {
          if (product.name === this.productName) {
            product.amount++;
            this.productName = '';
            count++;
          }
        });
        if (count === 0) {
          const p = {name: this.productName, amount: 1};
          this.products.push(p);
          this.productName = '';
        }
      } else {
        const p = {name: this.productName, amount: 1};
        this.products.push(p);
        this.productName = '';
      }
    }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
