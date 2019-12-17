import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() username: string;
  @Input() password: string;
  error: string;

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    if (this.username !== '' && this.username && this.password !== '' && this.password) {
      const user = { name: this.username, hash: this.password };
      this._auth.registerUser(user).subscribe(res => {
          if (res !== null) {
            this.router.navigate(['login']).then(() => {});
          } else {
            this.error = 'could not register';
          }
        },
        () => {
          this.error = 'could not register';
      });
    } else {
      this.error = 'could not register';
    }
  }
}
