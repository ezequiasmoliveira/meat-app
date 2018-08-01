import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RadioOption } from './../shared/radio/radio-option.model';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { CartItem } from './../restaurant-detail/shopping-cart/cart-item.model';

import { OrderService } from './order.service';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  delivery = 8;
  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ];

  constructor(private _orderService: OrderService,
              private _router: Router) { }

  ngOnInit() {
  }

  itemsValue(): number {
    return this._orderService.itemsValue();
  }
  cartItems(): CartItem[] {
    return this._orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    this._orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this._orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this._orderService.remove(item);
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id));

    this._orderService.checkOrder(order)
      .subscribe( (orderId: string) => {
        this._router.navigate(['/order-summary']);

        this._orderService.clear();
      } );
  }

}
