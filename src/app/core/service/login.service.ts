import { Router, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter} from 'rxjs/operators';

import { MEAT_API } from './../../app.api';

import { User } from './../model/user.model';

@Injectable()
export class LoginService {

  user: User;
  lastUrl: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this._router.events.pipe(
                          filter( e => e instanceof NavigationEnd)
                        ).subscribe( (e: NavigationEnd) => this.lastUrl = e.url )
  }

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  login(email: string, password: string): Observable<User> {
    return this._http.post<User>(`${MEAT_API}/login`, {email: email, password: password})
                      .pipe(
                          tap(user => this.user = user));
  }

  handleLogin(path: string = this.lastUrl) {
    this._router.navigate(['/login', btoa(path)])
  }

  logout() {
    this.user = undefined;
  }
}
