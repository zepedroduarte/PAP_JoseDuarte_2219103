import { Component, OnInit } from '@angular/core';

import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {faPlus} from  "@fortawesome/free-solid-svg-icons"
import {faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {AuthService} from "../shared/services/auth-service.service";
import {AdvertService} from "../shared/services/advert-service.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faSearch = faSearch;
  faPlus = faPlus;
  faEnvelope = faEnvelope;
  advertData: any = [];


  constructor(private advertService: AdvertService) { }

  ngOnInit(): void {

    this.advertService.getMainPageAdverts().subscribe(data => {
      this.advertData = data
    })
  }
}
