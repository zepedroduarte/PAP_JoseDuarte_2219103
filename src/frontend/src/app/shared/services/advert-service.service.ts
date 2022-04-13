import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CreateAdvert} from "../models/create-advert";
import {Observable} from "rxjs";
import {Categories} from "../models/categories";
import {GetAdvertPaginated} from "../models/GetAdvertPaginated";
import {GetAdvertById} from "../models/getAdvertById";



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

  getAdverts(currentPage: number):Observable<GetAdvertPaginated>{
    const httpOptions = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
                                .append('Authorization', 'Bearer ' + JSON.parse(<string>localStorage.getItem('user')).stsTokenManager.accessToken)
    }

    return this.http.get<GetAdvertPaginated>(`https://localhost:5001/advert?currentPageNumber=${currentPage}`, httpOptions)
  }

  getAdvert(id: number):Observable<GetAdvertById> {
    const httpOptions = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
                                .append('Authorization', 'Bearer ' + JSON.parse(<string>localStorage.getItem('user')).stsTokenManager.accessToken)
    }

    return this.http.get<GetAdvertById>(`https://localhost:5001/advert/${id}`, httpOptions)
  }

  deleteAdvert(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + JSON.parse(<string>localStorage.getItem('user')).stsTokenManager.accessToken})
    }

    return this.http.delete(`https://localhost:5001/advert/${id}`, httpOptions)
  }
}
