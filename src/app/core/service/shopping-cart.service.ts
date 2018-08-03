import { Injectable } from '@angular/core';

import { MenuItem } from './../model/menu-item.model';
import { CartItem } from './../model/cart-item.model';

import { NotificationService } from './../../shared/messages/notification.service';

@Injectable()
export class ShoppingCartService {

  items: CartItem[] = [];

  constructor(private _notificationService: NotificationService) {}

  clear() {
    this.items = [];
  }

  addItem(item: MenuItem) {
    let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id);

    if (foundItem) {
      this.increaseQty(foundItem);
    } else {
      this.items.push(new CartItem(item));
    }
    this._notificationService.nofity(`Você adicionou o item ${item.name}`);
  }

  increaseQty(item: CartItem) {
    item.quantity = item.quantity + 1;
  }

  decreaseQty(item: CartItem) {
    item.quantity = item.quantity - 1;
    if (item.quantity === 0) {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem) {
    this.items.splice(this.items.indexOf(item), 1);
    this._notificationService.nofity(`Você removeu o item ${item.menuItem.name}`);
  }

  total(): number {
    return this.items
      .map(item => item.value())
      .reduce((prev, value) => prev + value, 0);
  };


}
