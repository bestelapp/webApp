import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-user',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() username;
  @Input() password;
  error: string;

  constructor(private _auth: AuthService, private router: Router, private appComponent: AppComponent) { }

  ngOnInit() {
  }

  login() {
    if (this.username !== '' && this.password !== '') {
      const user = {name: this.username, hash: this.password};
      this._auth.loginUser(user).subscribe(
        res => {
          if (res != null) {
            localStorage.setItem('token', res.token);
            this.appComponent.ngOnInit();
            this.router.navigate(['order']).then(() => {});
          } else {
            this.error = 'login failed';
          }
        },
        () => {
          this.error = 'login failed';
        }
      );
    }
  }
}
