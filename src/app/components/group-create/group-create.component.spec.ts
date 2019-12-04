import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCreateComponent } from './group-create.component';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {GroupService} from '../../services/group/group.service';
import {UserInfoService} from '../../services/user-info/user-info.service';
import {of, throwError} from 'rxjs';

describe('GroupCreateComponent', () => {
  let component: GroupCreateComponent;
  let fixture: ComponentFixture<GroupCreateComponent>;
  let groupService: GroupService;
  let userInfoService: UserInfoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        GroupCreateComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCreateComponent);
    component = fixture.componentInstance;
    groupService = TestBed.get(GroupService);
    userInfoService = TestBed.get(UserInfoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create group', () => {
    component.name = 'group';
    const user = {id: 1, name: 'user'};
    const group = {id: 1, name: component.name, user};
    spyOn(userInfoService, 'getUser').and.returnValue(user);
    spyOn(groupService, 'create').and.returnValue(of(group));
    component.create();
    expect(component.name).toEqual('');
    expect(component.error).toEqual('');
  });

  it('should return error because of invalid user', () => {
    component.name = 'group';
    spyOn(userInfoService, 'getUser').and.returnValue(null);
    component.create();
    expect(component.error).toEqual('Could not create group');
  });

  it('should return error because of null return from rest call', () => {
    component.name = 'group';
    const user = {id: 1, name: 'user'};
    spyOn(userInfoService, 'getUser').and.returnValue(user);
    spyOn(groupService, 'create').and.returnValue(of(null));
    component.create();
    expect(component.error).toEqual('Could not create group');
  });

  it('should return error because of error thrown from rest call', () => {
    component.name = 'group';
    const user = {id: 1, name: 'user'};
    spyOn(userInfoService, 'getUser').and.returnValue(user);
    spyOn(groupService, 'create').and.returnValue(throwError({status: 500}));
    component.create();
    expect(component.error).toEqual('Could not create group');
  });
});
