import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersClaimedComponent } from './orders-claimed.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';
import { of } from 'rxjs';

describe('OrdersClaimedComponent', () => {
  let component: OrdersClaimedComponent;
  let fixture: ComponentFixture<OrdersClaimedComponent>;
  let userInfoService: UserInfoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [ OrdersClaimedComponent ],
      providers: [
        UserInfoService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersClaimedComponent);
    component = fixture.componentInstance;
    component.loggedInUser = {id: 1, name: 'user'};
    userInfoService = TestBed.get(UserInfoService);
    fixture.detectChanges();
  });
/*
  it('should create', () => {
    spyOn(userInfoService, 'getUser').and.returnValue({id: 1, name: 'user'});
    expect(component).toBeTruthy();
  });
*/
});
