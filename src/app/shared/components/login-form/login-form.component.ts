import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  hide = true;
  txtUser = '';
  txtPassword = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.logIn(this.txtUser, this.txtPassword);
  }

}
