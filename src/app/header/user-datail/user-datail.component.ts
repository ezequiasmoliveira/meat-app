import { User } from './../../core/model/user.model';
import { Component, OnInit, Injectable } from '@angular/core';

import { LoginService } from './../../core/service/login.service';



@Component({
  selector: 'mt-user-datail',
  templateUrl: './user-datail.component.html',
  styleUrls: ['./user-datail.component.css']
})
@Injectable()
export class UserDatailComponent implements OnInit {

  constructor(private _loginService: LoginService) { }

  ngOnInit() {
  }

  user(): User {
    return this._loginService.user;
  }

  isLoggerIn(): boolean {
    return this._loginService.isLoggedIn();
  }

  login() {
    this._loginService.handleLogin();
  }

  logout() {
    this._loginService.logout();
  }

}
