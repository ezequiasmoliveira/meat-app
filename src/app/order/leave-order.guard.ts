import { OrderComponent } from './order.component';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export class LeaveOrderGuard implements CanDeactivate<OrderComponent> {

  canDeactivate(orderComponent: OrderComponent,
                activeteRoute: ActivatedRouteSnapshot,
                routerState: RouterStateSnapshot): boolean {
      if (!orderComponent.isOrderCompleted) {
        return window.confirm('Deseja disistir da compra?');
      } else {
        return true;
      }
  }
}
