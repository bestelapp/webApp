import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupComponent } from './group.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {GroupService} from '../../services/group/group.service';
import {of, throwError} from 'rxjs';

describe('GroupComponent', () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;
  let groupService: GroupService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        GroupComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
    groupService = TestBed.get(GroupService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set all groups', () => {
    const groups = [{id: 1, name: 'group', users: {id: 1, name: 'user'}}];
    spyOn(groupService, 'getAll').and.returnValue(of(groups));
    component.ngOnInit();
    expect(component.groups).toEqual(groups);
    expect(groupService.getAll).toHaveBeenCalledTimes(1);
  });

  it('should set zero groups because of thrown error', () => {
    spyOn(groupService, 'getAll').and.returnValue(throwError({status: 500}));
    component.ngOnInit();
    expect(component.groups).toEqual([]);
    expect(groupService.getAll).toHaveBeenCalledTimes(1);
  });
});
