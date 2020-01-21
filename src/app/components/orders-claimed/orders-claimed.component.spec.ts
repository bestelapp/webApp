import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersClaimedComponent } from './orders-claimed.component';

describe('OrdersClaimedComponent', () => {
  let component: OrdersClaimedComponent;
  let fixture: ComponentFixture<OrdersClaimedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersClaimedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersClaimedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
