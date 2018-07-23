import { CartItem } from './cart-item.model';
import { ShoppingCartService } from './shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

  constructor(private _shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  items(): any {
    return this._shoppingCartService.items;
  }

  clear() {
    this._shoppingCartService.clear();
  }

  removeItem(item: CartItem) {
    this._shoppingCartService.removeItem(item);
  }

  addItem(item: any) {
    this._shoppingCartService.addItem(item);
  }

  total(): number {
    return this._shoppingCartService.total();
  }
}
