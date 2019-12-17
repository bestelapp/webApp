import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from '../../services/group/group.service';

@Component({
  selector: 'app-group-id',
  templateUrl: './group-id.component.html',
  styleUrls: ['./group-id.component.css']
})
export class GroupIdComponent implements OnInit, OnDestroy {

  private routeSub: Subscription;
  id: number;
  group: {};

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
        if (res) {
          this.group = res;
        } else {
          this.group = {};
        }
      },
      () => this.group = {}
    );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
