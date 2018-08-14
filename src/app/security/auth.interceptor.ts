import { LoginService } from './../core/service/login.service';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginService = this._injector.get(LoginService);
    if (loginService.isLoggedIn()) {
      const authResquest = request.clone({setHeaders: {'Authorization': `Bearer ${loginService.user.accessToken}`}})
      return next.handle(authResquest);
    } else {
      return next.handle(request);
    }
  }

}
