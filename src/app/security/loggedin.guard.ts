import { LoginService } from './../core/service/login.service';
import { CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '../../../node_modules/@angular/core';

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

  constructor(private _loginService: LoginService) {}

  checkAuthentication(path: string): boolean {
    const loggeIn = this._loginService.isLoggedIn();
    if (!loggeIn) {
      this._loginService.handlelogin(`/${path}`);
    }
    return false;
  }
  canLoad(route: Route): boolean {
    return this.checkAuthentication(route.path);
  }

  canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
    return this.checkAuthentication(activatedRoute.routeConfig.path);
  }

}
