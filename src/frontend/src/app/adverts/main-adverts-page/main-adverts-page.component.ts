import { Component, OnInit } from '@angular/core';
import {AdvertService} from "../../shared/services/advert-service.service";

@Component({
  selector: 'app-main-adverts-page',
  templateUrl: './main-adverts-page.component.html',
  styleUrls: ['./main-adverts-page.component.scss']
})
export class MainAdvertsPageComponent implements OnInit {

  advertsData: any[] = [];

  constructor(private advertService: AdvertService) { }

  ngOnInit(): void {
    this.advertService.getAllAdverts().subscribe(data => {
      this.advertsData = data;
    })
  }
}
