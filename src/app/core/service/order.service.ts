import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { MEAT_API } from '../../app.api';

import { Order } from '../model/order.model';
import { CartItem } from '../model/cart-item.model';

import { ShoppingCartService } from './shopping-cart.service';


@Injectable()
export class OrderService {

  constructor(private _cartService: ShoppingCartService, private _http: Http) {}

  cartItems(): CartItem[] {
    return this._cartService.items;
  }

  increaseQty(item: CartItem) {
    this._cartService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this._cartService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this._cartService.removeItem(item);
  }

  itemsValue(): number {
    return this._cartService.total();
  }

  checkOrder(order: Order): Observable<string> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.post(`${MEAT_API}/orders`,
                            JSON.stringify(order),
                            new RequestOptions({headers: headers}))
                     .map(response => response.json())
                     .map(order => order.id);
  }

  clear() {
    this._cartService.clear();
  }

}
