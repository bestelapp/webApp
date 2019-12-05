import {Component, Input, OnInit} from '@angular/core';
import {GroupService} from '../../services/group/group.service';
import {UserInfoService} from '../../services/user-info/user-info.service';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {
  @Input() name;
  error;

  constructor(private _group: GroupService, private _userInfoService: UserInfoService) { }

  ngOnInit() {
  }

  create() {
    if (this.name && this.name !== '') {
      const user = this._userInfoService.getUser();
      if (user) {
        this._group.create({name: this.name, owner: user}).subscribe(
          res => {
            if (res !== null) {
              this.error = '';
              this.name = '';
            } else {
              this.error = 'Could not create group';
            }
          },
          () => {
            this.error = 'Could not create group';
          }
        );
      } else {
        this.error = 'Could not create group';
      }
    }
  }
}
