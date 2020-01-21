import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../../services/order/order.service';
import {UserInfoService} from '../../services/user-info/user-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() group: any;
  orders: Array<any>;
  loggedInUser: { id: any; name: any; };

  constructor(private _order: OrderService, private _userInfoService: UserInfoService, private router: Router) { }

  ngOnInit() {
    this.loggedInUser = this._userInfoService.getUser();
  }

  isInUserGroup() {
    const nameList: any[] = [];
    this.group.users.forEach(
      (u: {name: string}) => {
        nameList.push(u.name);
      }
    );
    if (nameList.includes(this.loggedInUser.name)) {
      return true;
    }
    return false;
  }

  claimOrder(id: number) {
    const data = {
      id,
      claimUser: this._userInfoService.getUser()
    };
    this._order.claimOrder(data).subscribe(
      res => {
        if (res) {
          this.router.navigate(['group/' + this.group.id]).then(() => {})
        }
    });
  }
}
