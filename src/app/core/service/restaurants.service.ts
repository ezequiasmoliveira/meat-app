import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MEAT_API } from './../../app.api';

import { ErrorHandler } from './../../app.error-handler';

import { MenuItem } from './../model/menu-item.model';
import { Restaurant } from './../model/restaurant.model';


@Injectable()
export class RestaurantService {

  constructor(private _http: Http) {}

  restaurants(search?: string): Observable<Restaurant[]> {
    return this._http.get(`${MEAT_API}/restaurants`, {params: {q: search}})
      .map(response => response.json())
      .catch(ErrorHandler.handlerError);
  }

  restaurantById(id: string): Observable<Restaurant> {
    return this._http.get(`${MEAT_API}/restaurants/${id}`)
      .map(response => response.json())
      .catch(ErrorHandler.handlerError);
  }

  reviewsOfRestaurant(id: string): Observable<any> {
    return this._http.get(`${MEAT_API}/restaurants/${id}/reviews`)
      .map(response => response.json())
      .catch(ErrorHandler.handlerError);
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this._http.get(`${MEAT_API}/restaurants/${id}/menu`)
      .map(response => response.json())
      .catch(ErrorHandler.handlerError);
  }

}

