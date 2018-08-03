import { NgModule } from '@angular/core';

import { OrderService } from './service/order.service';
import { RestaurantService } from './service/restaurants.service';
import { ShoppingCartService } from './service/shopping-cart.service';


@NgModule({
  providers: [ShoppingCartService, RestaurantService, OrderService]
})
export class CoreModule {}
