import { NotificationService } from './messages/notification.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RatingComponent } from './rating/rating.component';
import { RadioComponent } from './radio/radio.component';
import { InputComponent } from './input/input.component';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';

import { OrderService } from './../core/service/order.service';
import { RestaurantService } from './../core/service/restaurants.service';
import { ShoppingCartService } from './../core/service/shopping-cart.service';
import { LoginService } from './../core/service/login.service';

import { LoggedInGuard } from './../security/loggedin.guard';

@NgModule({
  declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, RadioComponent, RatingComponent,
            CommonModule, FormsModule, ReactiveFormsModule,
            SnackbarComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ShoppingCartService,
                  RestaurantService,
                  OrderService,
                  NotificationService,
                  LoginService,
                  LoggedInGuard]
    };
  }
}
