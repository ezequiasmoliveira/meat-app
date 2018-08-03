import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

import { Restaurant } from '../core/model/restaurant.model';

import { RestaurantService } from './../core/service/restaurants.service';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[];
  constructor(private _restaurantService: RestaurantService) { }

  ngOnInit() {
    this._restaurantService.restaurants().subscribe(rests => this.restaurants = rests);
  }

}
