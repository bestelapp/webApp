import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth/auth.service';
import {Router} from '@angular/router';
import {UserInfoService} from './services/user-info/user-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user = null;
  title = 'webApp';

  constructor(public _authService: AuthService, private _router: Router, private _userInfoService: UserInfoService) {}

  logOut() {
    this._authService.logOut();
    this._router.navigate(['/login']);
    this.user = null;
  }

  ngOnInit(): void {
    this.user = this._userInfoService.getUser();
  }
}
