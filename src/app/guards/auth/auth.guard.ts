import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this._authService.loggedIn() && route.data.requiresLogin) {
      return true;
    } else if (this._authService.loggedIn() && !route.data.requiresLogin) {
      return false;
    } else if (!this._authService.loggedIn() && route.data.requiresLogin) {
       this._router.navigate(['/login']);
       return false;
     } else {
      return true;
    }
  }
}
