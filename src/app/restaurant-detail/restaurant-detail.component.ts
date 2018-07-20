import { Component, OnInit } from '@angular/core';

import { RestaurantService } from './../restaurants/restaurants.service';
import { Restaurant } from '../restaurants/restaurant/restaurant.model';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: Restaurant;

  constructor(private _restauranteService: RestaurantService,
              private _router: ActivatedRoute) { }
  ngOnInit() {
    this._restauranteService.restaurantById(this._router.snapshot.params['id'])
      .subscribe(restaurant => this.restaurant = restaurant);
  }

}
