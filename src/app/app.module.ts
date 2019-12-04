import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { OrderCreateComponent } from './components/order-create/order-create.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './guards/auth/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor/token-interceptor.service';
import { OrderService } from './services/order/order.service';
import { UserInfoService } from './services/user-info/user-info.service';
import { GroupCreateComponent } from './components/group-create/group-create.component';
import { GroupIdComponent } from './components/group-id/group-id.component';
import { GroupComponent } from './components/group/group.component';
import { GroupUserAddComponent } from './components/group-user-add/group-user-add.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    OrderCreateComponent,
    RegisterComponent,
    LoginComponent,
    GroupCreateComponent,
    GroupIdComponent,
    GroupComponent,
    GroupUserAddComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    UserInfoService,
    OrderService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
