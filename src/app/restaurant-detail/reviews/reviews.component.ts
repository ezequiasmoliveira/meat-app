import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { RestaurantService } from './../../core/service/restaurants.service';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>;
  constructor(private _restaurantService: RestaurantService,
              private _router: ActivatedRoute) { }

  ngOnInit() {
    this.reviews = this._restaurantService.reviewsOfRestaurant(
        this._router.parent.snapshot.params['id']);
  }

}
