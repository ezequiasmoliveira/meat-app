import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';

import { MEAT_API } from './../../app.api';

import { User } from './../model/user.model';

@Injectable()
export class LoginService {

  user: User;

  constructor(private _http: HttpClient, private _router: Router) {}

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  login(email: string, password: string): Observable<User> {
    return this._http.post<User>(`${MEAT_API}/login`, {email: email, password: password})
                      .do(user => this.user = user);
  }

  handlelogin(path?: string) {
    this._router.navigate(['/login', btoa(path)])
  }

}
