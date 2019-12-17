import { Component, OnInit } from '@angular/core';
import {GroupService} from '../../services/group/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  groups: Array<any> = [];

  constructor(private _groupService: GroupService) { }

  ngOnInit() {
    this.getAllGroups();
  }

  private getAllGroups() {
    this._groupService.getAll().subscribe(
      res => this.groups = res,
      () => this.groups = []
    );
  }
}
