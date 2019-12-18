import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {GroupService} from '../../services/group/group.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-group-user-add',
  templateUrl: './group-user-add.component.html',
  styleUrls: ['./group-user-add.component.css']
})
export class GroupUserAddComponent implements OnInit, OnDestroy {

  private routeSub: Subscription;
  id: number;
  group: {id: number, name: string, owner: object, users: any[]} = null;
  users: any[] = [];
  usersUnfiltered: any[] = [];
  @Input() name: string;

  constructor(private route: ActivatedRoute, private _group: GroupService, private _user: UserService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.getGroup();
      this.getAllUsers();
    });
  }
  getAllUsers() {
    this._user.getAllUsers().subscribe(
      res => {
        if (res) {
          this.users = res;
          this.usersUnfiltered = res;
        } else {
          this.users = [];
        }
      },
      () => this.users = []
    );
  }

  getGroup() {
    this._group.getById(this.id).subscribe(
      res => {
        if (res) {
          this.group = res;
        } else {
          this.group = null;
        }
      },
      () => this.group = null
    );
  }

  searchUsers() {
    const filtered: any[] = [];
    this.usersUnfiltered.some((u: {name: string}) => {
      if (u.name.includes(this.name)) {
        filtered.push(u);
      }
    });
    this.users = filtered;
  }

  isInGroupUsers(name: string) {
    const nameList: any[] = [];
    this.group.users.forEach(
      (u: {name: string}) => {
        nameList.push(u.name);
      }
    );
    if (nameList.includes(name)) {
      return true;
    }
    return false;
  }

  addUser(user: object) {
    this._group.addUsersToGroup(this.id, user).subscribe(
      res => {
        if (res) {
          this.getGroup();
        }
      }
    );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
