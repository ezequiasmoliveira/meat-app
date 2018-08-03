import { OnInit, Input } from '@angular/core';
import { Component } from '@angular/core';
import { Restaurant } from '../../core/model/restaurant.model';


@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html'
})
export class RestaurantComponent implements OnInit {

  @Input() restaurant: Restaurant;

  constructor() {};

  ngOnInit() {
  }

}
