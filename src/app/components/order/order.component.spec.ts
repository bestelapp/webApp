import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {OrderService} from '../../services/order/order.service';
import {UserInfoService} from '../../services/user-info/user-info.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let userInfoService: UserInfoService;
  let orderService: OrderService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ OrderComponent ],
      providers: [
        OrderService,
        UserInfoService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    userInfoService = TestBed.get(UserInfoService);
    orderService = TestBed.get(OrderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(userInfoService, 'getUser');
    spyOn(orderService, 'getAllOrders');
    expect(component).toBeTruthy();
  });
});
