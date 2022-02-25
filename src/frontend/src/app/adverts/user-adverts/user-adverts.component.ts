import { Component, OnInit } from '@angular/core';
import {AdvertService} from "../../shared/services/advert-service.service";

@Component({
  selector: 'app-user-adverts',
  templateUrl: './user-adverts.component.html',
  styleUrls: ['./user-adverts.component.scss']
})
export class UserAdvertsComponent implements OnInit {

  advertsArray: any[] = [];

  constructor(private advertService: AdvertService) { }

  ngOnInit(): void {
    this.getAdverts();
  }

  getAdverts() {
    this.advertService.getAdvert().subscribe(data => {
      this.advertsArray = data;
    })
  }

}
