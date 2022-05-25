import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserData} from "../models/user";
import {UpdateUser} from "../models/update-user";
import {Rating} from "../models/rating";
import {RatingNumber} from "../models/ratingNumber";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  getUser() {
    const httpOptions = {
      headers: { 'Authorization': 'Bearer ' + JSON.parse(<string>localStorage.getItem('user')).stsTokenManager.accessToken}
    }

    return this.http.get<UserData>('https://localhost:5001/User', httpOptions)
  }

  getUserById(id: number) {
    const httpOptions = {
      headers: { 'Authorization': 'Bearer ' + JSON.parse(<string>localStorage.getItem('user')).stsTokenManager.accessToken}
    }

    return this.http.get<UserData>(`https://localhost:5001/user/${id}`, httpOptions)
  }

  updateUser(user: UpdateUser, id: number) {
    const httpOptions = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
                                .append( 'Authorization', 'Bearer ' + JSON.parse(<string>localStorage.getItem('user')).stsTokenManager.accessToken)
    }

    return this.http.put(`https://localhost:5001/User/${id}`, JSON.stringify(user), httpOptions)
  }

  userRateUser(rating: Rating) {
    const httpOptions = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
        .append( 'Authorization', 'Bearer ' + JSON.parse(<string>localStorage.getItem('user')).stsTokenManager.accessToken)
    }

    return this.http.post(`https://localhost:5001/user/ratings`, JSON.stringify(rating), httpOptions)
  }

  userUpdateRateUser(rating: Rating) {
    const httpOptions = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
        .append( 'Authorization', 'Bearer ' + JSON.parse(<string>localStorage.getItem('user')).stsTokenManager.accessToken)
    }

    return this.http.put(`https://localhost:5001/user/ratings`, JSON.stringify(rating), httpOptions)
  }

  getUserRatingById(id: number) {
    return this.http.get<RatingNumber>(`https://localhost:5001/user/ratings/${id}`)
  }

  getUserRating(userEvaluatedId: number, userRateId: number) {
    return this.http.get<RatingNumber>(`https://localhost:5001/user/userrating?userEvaluatedId=${userEvaluatedId}&userRateId=${userRateId}`)
  }

}
