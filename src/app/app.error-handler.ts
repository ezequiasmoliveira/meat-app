import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { LoginService } from './core/service/login.service';
import { NotificationService } from './shared/messages/notification.service';

@Injectable()
export class AplicationErrorHandler extends ErrorHandler {

  constructor(private _notificationService: NotificationService,
              private _injector: Injector,
              private _zone: NgZone) {
    super();
  }

  handlerError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message;
      this._zone.run( () => {
        switch (errorResponse.status) {
          case 401:
            this._injector.get(LoginService).handleLogin();
            break;
          case 403:
            this._notificationService.nofity(message || 'Não autorizado.');
            break;
          case 404:
            this._notificationService.nofity(message || 'Recurso não encontrado. Verifique o console para mais detalhes.');
            break;
        }
      })
    }
    super.handleError(errorResponse);
  }

}
