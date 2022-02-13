import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserData} from "../models/user";
import {UpdateUser} from "../models/update-user";

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

  updateUser(user: UpdateUser, id: number) {
    const httpOptions = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
                                .append( 'Authorization', 'Bearer ' + JSON.parse(<string>localStorage.getItem('user')).stsTokenManager.accessToken)
    }

    return this.http.put(`https://localhost:5001/User/${id}`, JSON.stringify(user), httpOptions)
  }
}
