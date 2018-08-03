import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RestaurantService } from './../core/service/restaurants.service';

import { Restaurant } from '../core/model/restaurant.model';

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
