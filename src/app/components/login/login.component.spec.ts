import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthService} from '../../services/auth/auth.service';
import {of, throwError} from 'rxjs';
import {routes} from '../../app-routing.module';
import {AppComponent} from '../../app.component';
import {Router} from '@angular/router';
import {RegisterComponent} from '../register/register.component';
import {OrderComponent} from '../order/order.component';
import {OrderCreateComponent} from '../order-create/order-create.component';
import {GroupComponent} from '../group/group.component';
import {GroupCreateComponent} from '../group-create/group-create.component';
import {GroupIdComponent} from '../group-id/group-id.component';
import {GroupUserAddComponent} from '../group-user-add/group-user-add.component';
import {Location} from '@angular/common';
import { OrdersClaimedComponent } from '../orders-claimed/orders-claimed.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let appComponent: AppComponent;
  let fixture: ComponentFixture<LoginComponent>;
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
        LoginComponent,
        RegisterComponent,
        OrderComponent,
        OrderCreateComponent,
        GroupComponent,
        GroupCreateComponent,
        GroupIdComponent,
        GroupUserAddComponent,
        OrdersClaimedComponent
      ],
      providers: [
        AppComponent,
        AuthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    appComponent = TestBed.get(AppComponent);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should place call loginUser, appComponent.ngOnInit, set token and redirect to order', fakeAsync(() => {
    component.username = 'user';
    component.password = 'password';
    spyOn(authService, 'loginUser').and.returnValue(of({token: 'JWTToken'}));
    spyOn(appComponent, 'ngOnInit');
    component.login();
    tick();
    expect(localStorage.getItem('token')).toEqual('JWTToken');
    expect(location.path()).toEqual('/group');
    expect(authService.loginUser).toHaveBeenCalledTimes(1);
    expect(appComponent.ngOnInit).toHaveBeenCalledTimes(1);
    localStorage.removeItem('token');
  }));

  it('should return error because of null return value', () => {
    component.username = 'user';
    component.password = 'password';
    spyOn(authService, 'loginUser').and.returnValue(of(null));
    component.login();
    expect(component.error).toEqual('login failed');
    expect(authService.loginUser).toHaveBeenCalledTimes(1);
  });

  it('should return error because of thrown error', () => {
    component.username = 'user';
    component.password = 'password';
    spyOn(authService, 'loginUser').and.returnValue(throwError({status: 500}));
    component.login();
    expect(component.error).toEqual('login failed');
    expect(authService.loginUser).toHaveBeenCalledTimes(1);
  });

  it('should not set token because of non defined username and password', () => {
    component.username = '';
    component.login();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
