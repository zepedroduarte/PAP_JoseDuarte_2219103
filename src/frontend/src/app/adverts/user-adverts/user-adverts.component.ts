import { Component, OnInit } from '@angular/core';
import {AdvertService} from "../../shared/services/advert-service.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-user-adverts',
  templateUrl: './user-adverts.component.html',
  styleUrls: ['./user-adverts.component.scss']
})
export class UserAdvertsComponent implements OnInit {

  advertsArray: any;

  totalCount!: number;
  pageSize!: number;

  constructor(private advertService: AdvertService, private location: Location) { }

  ngOnInit(): void {
    this.getAdverts(1);
  }

  back() {
    this.location.back();
  }

  getAdverts(currentPageNumber: number) {
    this.advertService.getAdverts(currentPageNumber).subscribe(data => {
      this.pageSize = data.pageSize
      this.totalCount = data.totalCount
      this.advertsArray = data;
    })
  }

}
