import { Injectable } from '@angular/core';
import {CreateUser} from "../models/create-user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CreateAdvert} from "../models/create-advert";
import {Observable} from "rxjs";
import {Categories} from "../models/categories";

@Injectable({
  providedIn: 'root'
})
export class AdvertService {

  constructor(public http: HttpClient) { }

  getCategories():Observable<Categories[]> {
    return this.http.get<Categories[]>('https://localhost:5001/categories')
  }

  createAdvert(data: CreateAdvert) {
    const httpOptions = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
                                .append( 'Authorization', 'Bearer ' + JSON.parse(<string>localStorage.getItem('user')).stsTokenManager.accessToken)
    }
    return this.http.post('https://localhost:5001/advert', JSON.stringify(data), httpOptions)
  }
}
