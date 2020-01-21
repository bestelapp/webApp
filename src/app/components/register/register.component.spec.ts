import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {of, throwError} from 'rxjs';
import {routes} from '../../app-routing.module';
import {OrderComponent} from '../order/order.component';
import {OrderCreateComponent} from '../order-create/order-create.component';
import {GroupComponent} from '../group/group.component';
import {GroupCreateComponent} from '../group-create/group-create.component';
import {GroupIdComponent} from '../group-id/group-id.component';
import {GroupUserAddComponent} from '../group-user-add/group-user-add.component';
import {LoginComponent} from '../login/login.component';
import { OrdersClaimedComponent } from '../orders-claimed/orders-claimed.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        RegisterComponent,
        LoginComponent,
        OrderComponent,
        OrderCreateComponent,
        GroupComponent,
        GroupCreateComponent,
        GroupIdComponent,
        GroupUserAddComponent,
        OrdersClaimedComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should place call registerUser and redirect to login', fakeAsync(() => {
    component.username = 'user';
    component.password = 'password';
    spyOn(authService, 'registerUser').and.returnValue(of({user: {id: 1, name: 'user'}}));
    component.register();
    tick();
    expect(location.path()).toEqual('/login');
    expect(authService.registerUser).toHaveBeenCalledTimes(1);
  }));

  it('should return error because of non defined username and password', () => {
    component.username = '';
    component.password = '';
    component.register();
    expect(component.error).toEqual('could not register');
  });

  it('should return error because of null return value', () => {
    component.username = 'user';
    component.password = 'password';
    spyOn(authService, 'registerUser').and.returnValue(of(null));
    component.register();
    expect(component.error).toEqual('could not register');
    expect(authService.registerUser).toHaveBeenCalledTimes(1);
  });

  it('should return error because of thrown error', () => {
    component.username = 'user';
    component.password = 'password';
    spyOn(authService, 'registerUser').and.returnValue(throwError({status: 500}));
    component.register();
    expect(component.error).toEqual('could not register');
    expect(authService.registerUser).toHaveBeenCalledTimes(1);
  });
});
