import { ErrorHandler } from './../app.error-handler';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MEAT_API } from './../app.api';
import { Restaurant } from './restaurant/restaurant.model';

@Injectable()
export class RestaurantService{

  constructor(private _http: Http){}

  restaurants(): Observable<Restaurant[]>{
    return this._http.get(`${MEAT_API}/restaurants`)
      .map(response => response.json())
      .catch(ErrorHandler.handlerError);
  }
}
