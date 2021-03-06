import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';

import { CartItem } from './../../core/model/cart-item.model';

import { ShoppingCartService } from './../../core/service/shopping-cart.service';


@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  preserveWhitespaces: true,
  animations: [
    trigger('row', [
      state('ready', style({opacity: 1})),
      transition('void => ready', animate('300ms 0s ease-in', keyframes([
        style({opacity: 0, transform: 'translateX(-30px)', offset: 0}),
        style({opacity: 0.8, transform: 'translateX(10px)', offset: 0.8}),
        style({opacity: 1, transform: 'translateX(0px)', offset: 1})
      ]))),
      transition('ready => void', animate('400ms 0s ease-out', keyframes([
        style({opacity: 1, transform: 'translateX(0px)', offset: 0}),
        style({opacity: 0.2, transform: 'translateX(-10px)', offset: 0.2}),
        style({opacity: 0, transform: 'translateX(30px)', offset: 1})
      ])))
    ])
  ]
})
export class ShoppingCartComponent implements OnInit {

  rowState = 'ready';

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
