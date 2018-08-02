import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

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

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  numberPattern = /^[0-9]*$/;
  orderForm: FormGroup;
  delivery = 8;
  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ];
  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');

    if (!email || !emailConfirmation) {
      return undefined;
    }
    if (email.value !== emailConfirmation.value) {
      return {emailsNotMatch: true};
    }
    return undefined;
  }

  constructor(private _orderService: OrderService,
              private _router: Router,
              private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this._formBuilder.group({
      name: this._formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this._formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this._formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this._formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this._formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this._formBuilder.control(''),
      paymentOption: this._formBuilder.control('', [Validators.required])
    }, {validator: OrderComponent.equalsTo});
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
