import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MEAT_API } from '../../app.api';

import { Order } from '../model/order.model';
import { CartItem } from '../model/cart-item.model';

import { ShoppingCartService } from './shopping-cart.service';
import { LoginService } from './login.service';


@Injectable()
export class OrderService {

  constructor(private _cartService: ShoppingCartService,
              private _http: HttpClient,
              private _loginService: LoginService) {}

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
    let headers = new HttpHeaders();
    if (this._loginService.isLoggedIn()) {
      headers = headers.set('Authorization', `Bearer ${this._loginService.user.accessToken}`);
    }
    return this._http.post<Order>(`${MEAT_API}/orders`, order, {headers: headers})
                     .map(ord => order.id);
  }

  clear() {
    this._cartService.clear();
  }

}
