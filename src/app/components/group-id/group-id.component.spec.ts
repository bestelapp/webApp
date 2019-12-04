import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupIdComponent } from './group-id.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of, throwError} from 'rxjs';
import {GroupService} from '../../services/group/group.service';

describe('GroupIdComponent', () => {
  let component: GroupIdComponent;
  let fixture: ComponentFixture<GroupIdComponent>;
  let groupService: GroupService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        GroupIdComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupIdComponent);
    component = fixture.componentInstance;
    groupService = TestBed.get(GroupService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set group', () => {
    component.id = 1;
    const group = {id: 1, name: 'group', users: {id: 1, name: 'user'}};
    spyOn(groupService, 'getById').and.returnValue(of(group));
    component.ngOnInit();
    expect(component.group).toEqual(group);
    expect(groupService.getById).toHaveBeenCalledTimes(1);
  });

  it('should set zero groups because of thrown error', () => {
    spyOn(groupService, 'getById').and.returnValue(throwError({status: 500}));
    component.ngOnInit();
    expect(component.group).toEqual({});
    expect(groupService.getById).toHaveBeenCalledTimes(1);
  });
});

