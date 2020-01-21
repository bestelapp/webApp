import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderComponent} from './components/order/order.component';
import {OrderCreateComponent} from './components/order-create/order-create.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AuthGuard} from './guards/auth/auth.guard';
import {GroupCreateComponent} from './components/group-create/group-create.component';
import {GroupIdComponent} from './components/group-id/group-id.component';
import {GroupComponent} from './components/group/group.component';
import {GroupUserAddComponent} from './components/group-user-add/group-user-add.component';
import { OrdersClaimedComponent } from './components/orders-claimed/orders-claimed.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { requiresLogin: false },
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { requiresLogin: false }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { requiresLogin: false }
  },
  {
    path: 'order/create/:id',
    component: OrderCreateComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'group',
    component: GroupComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'group/create',
    component: GroupCreateComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'group/:id',
    component: GroupIdComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'group/add/:id',
    component: GroupUserAddComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'user/orders-claimed',
    component: OrdersClaimedComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
