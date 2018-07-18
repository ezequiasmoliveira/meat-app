import { Component, OnInit } from '@angular/core';

import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantService } from './restaurants.service';

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
