import { HttpClient, HttpParams } from '@angular/common/http';
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

  constructor(private _http: HttpClient) {}

  restaurants(search?: string): Observable<Restaurant[]> {
    let params: HttpParams = undefined;
    if (search) {
      params = new HttpParams().set('q', search);
    }
    return this._http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params});
  }

  restaurantById(id: string): Observable<Restaurant> {
    return this._http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`);
  }

  reviewsOfRestaurant(id: string): Observable<any> {
    return this._http.get(`${MEAT_API}/restaurants/${id}/reviews`);
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this._http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`);
  }

}

