import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';

import { MEAT_API } from '../../app.api';

import { Order } from '../model/order.model';
import { CartItem } from '../model/cart-item.model';

import { ShoppingCartService } from './shopping-cart.service';


@Injectable()
export class OrderService {

  constructor(private _cartService: ShoppingCartService,
              private _http: HttpClient) {}

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
    return this._http.post<Order>(`${MEAT_API}/orders`, order)
                     .pipe(map(ord => order.id));
  }

  clear() {
    this._cartService.clear();
  }

}
