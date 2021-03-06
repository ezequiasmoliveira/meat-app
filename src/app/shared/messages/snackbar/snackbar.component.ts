import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { timer } from 'rxjs';
import { tap, switchMap} from 'rxjs/operators';

import { NotificationService } from '../notification.service';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state( 'visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message = 'Hello there';
  snackVisibility = 'hidden';

  constructor(private _notificationService: NotificationService) {}

  ngOnInit() {
    this._notificationService.notifier
      .pipe(
          tap(message => {
            this.message = message;
            this.snackVisibility = 'visible';
          }),
          switchMap(message => timer(3000))
      ).subscribe(time => this.snackVisibility = 'hidden');
  }

}
