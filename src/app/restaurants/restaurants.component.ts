import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { from } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError} from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Restaurant } from '../core/model/restaurant.model';

import { RestaurantService } from './../core/service/restaurants.service';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        'max-height': '0px'
      })),
      state('visible', style({
        opacity: 1,
        'max-height': '70px',
        'margin-top': '20px'
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden';
  restaurants: Restaurant[];

  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(private _restaurantService: RestaurantService,
              private _formBuild: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this._formBuild.control('');
    this.searchForm = this._formBuild.group({
      searchControl: this.searchControl
    });

    this.searchControl.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap(searchTerm =>
            this._restaurantService.restaurants(searchTerm)
            .pipe(
              catchError(error => from([]))
            ))
        ).subscribe(rests => this.restaurants = rests);

    this._restaurantService.restaurants().subscribe(rests => this.restaurants = rests);
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }

}
