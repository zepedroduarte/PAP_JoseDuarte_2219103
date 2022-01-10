import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserData} from "../models/user";

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
}
