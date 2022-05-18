import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CreateAdvert} from "../models/create-advert";
import {Observable} from "rxjs";
import {Categories} from "../models/categories";
import {GetAdvertPaginated} from "../models/GetAdvertPaginated";
import {GetAdvertById} from "../models/getAdvertById";
import {UpdateAdvert} from "../models/updateAdvert";
import {UserFavouriteAdvert} from "../models/userFavouriteAdvert";
import {AllUserFavouriteAdvertsPaginated} from "../models/userFavouriteAdvertPaginated";
import {AllUserFavouriteAdverts} from "../models/allUserFavouriteAdverts";

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
      headers: {'Content-Type' : 'application/json'}

    }
    return this.http.post('https://localhost:5001/advert', JSON.stringify(data), httpOptions)
  }

  getAdverts(currentPage: number):Observable<GetAdvertPaginated>{
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + JSON.parse(<string>localStorage.getItem('user')).stsTokenManager.accessToken})
    }

    return this.http.get<GetAdvertPaginated>(`https://localhost:5001/advert?currentPageNumber=${currentPage}`, httpOptions)
  }

  getAdvert(id: number):Observable<GetAdvertById> {
    const httpOptions = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')

    }

    return this.http.get<GetAdvertById>(`https://localhost:5001/advert/${id}`, httpOptions)
  }

  deleteAdvert(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + JSON.parse(<string>localStorage.getItem('user')).stsTokenManager.accessToken})
    }

    return this.http.delete(`https://localhost:5001/advert/${id}`, httpOptions)
  }

  editAdvert(advertData:any, id: number) {
    const httpOptions = {
      headers: { 'Content-Type' : 'application/json' }
    }


    return this.http.put<UpdateAdvert>(`https://localhost:5001/advert/${id}`, JSON.stringify(advertData), httpOptions)
  }

  getAllAdvertsFiltered(currentPage: number, gender: string, category: string, minPrice: string, maxPrice: string, title: string):Observable<GetAdvertPaginated> {

    let url: string = `https://localhost:5001/advert/allfiltered?currentPageNumber=${currentPage}`;

    if (gender != '') {
      url += `&gender=${gender}`
    }

    if(category != '') {
      url += `&category=${category}`
    }

    if(minPrice != '') {
      url += `&minPrice=${minPrice}`
    }

    if(maxPrice != '') {
      url += `&maxPrice=${maxPrice}`
    }

    if(title != '') {
      url += `&title=${title}`
    }

    return this.http.get<GetAdvertPaginated>(url)
  }

  getAllAdverts(currentPage: number):Observable<GetAdvertPaginated> {
    return this.http.get<GetAdvertPaginated>(`https://localhost:5001/advert/all?currentPageNumber=${currentPage}`)
  }

  getUserFavouriteAdvert(userId?: number, productID?: number) {
    return this.http.get<UserFavouriteAdvert>(`https://localhost:5001/advert/userfavouriteadvert?userId=${userId}&productId=${productID}`)
  }

  addUserFavouriteAdvert(data?: UserFavouriteAdvert) {
    const httpOptions = {
      headers: {'Content-Type' : 'application/json'}
    }

    return this.http.post<UserFavouriteAdvert>(`https://localhost:5001/advert/userfavouriteadvert`, JSON.stringify(data), httpOptions)
  }

  removeUserFavouriteAdvert(advertId: number) {
    return this.http.delete(`https://localhost:5001/advert/userfavouriteadvert?advertId=${advertId}`)
  }

  getAllUserFavouriteAdvert(currentPage: number) {
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + JSON.parse(<string>localStorage.getItem('user')).stsTokenManager.accessToken})
    }

    return this.http.get<AllUserFavouriteAdvertsPaginated>(`https://localhost:5001/advert/getalluserfavouriteadvert?currentPageNumber=${currentPage}`, httpOptions)
  }

  getMainPageAdverts() {
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + JSON.parse(<string>localStorage.getItem('user')).stsTokenManager.accessToken})
    }

    return this.http.get<AllUserFavouriteAdverts>(`https://localhost:5001/advert/mainpageadverts`, httpOptions)
  }

}
