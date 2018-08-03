import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DeliveryCostsComponent } from './delivery-costs/delivery-costs.component';
import { OrderItemsComponent } from './order-items/order-items.component';
import { OrderComponent } from './order.component';

const ROUTES: Routes = [
  {path: '', component: OrderComponent}
];
@NgModule({
  declarations: [OrderComponent, OrderItemsComponent, DeliveryCostsComponent],
  imports: [RouterModule.forChild(ROUTES), SharedModule]
})
export class OrderModule {}
