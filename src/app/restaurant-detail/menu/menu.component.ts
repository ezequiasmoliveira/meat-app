import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MenuItem } from './../../core/model/menu-item.model';

import { RestaurantService } from './../../core/service/restaurants.service';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  menu: Observable<MenuItem[]>;
  constructor(private _restaurantService: RestaurantService,
              private _router: ActivatedRoute) { }

  ngOnInit() {
    this.menu = this._restaurantService.menuOfRestaurant(this._router.parent.snapshot.params['id']);
  }

  addMenuItem(item: MenuItem) {
    console.log(item);
  }

}
