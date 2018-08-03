import { EventEmitter } from '@angular/core';
export class NotificationService {

  notifier = new EventEmitter<string>();

  nofity(message: string) {
    this.notifier.emit(message);
  }
}
