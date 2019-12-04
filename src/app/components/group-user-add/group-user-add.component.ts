import {Component, Input, OnInit} from '@angular/core';
import {GroupService} from '../../services/group/group.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-group-user-add',
  templateUrl: './group-user-add.component.html',
  styleUrls: ['./group-user-add.component.css']
})
export class GroupUserAddComponent implements OnInit {

  private routeSub: Subscription;
  id;
  group = {};
  users = [];
  @Input() name;

  constructor(private route: ActivatedRoute, private _group: GroupService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.getGroup();
    });
  }

  getGroup() {
    this._group.getById(this.id).subscribe(
      res => {
        this.group = res;
      },
      err => console.log(err)
    );
  }

  searchUsers() {
    return null;
  }

  /*searchUsers() {
    this._group.getAllUsersByName(this.id, this.name).subscribe(
      res => {
        this.users = res.users;
      },
      err => console.log(err)
    );
  }*/

}
