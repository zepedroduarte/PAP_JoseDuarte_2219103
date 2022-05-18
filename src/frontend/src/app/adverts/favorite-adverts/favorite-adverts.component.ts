import { Component, OnInit } from '@angular/core';
import {AdvertService} from "../../shared/services/advert-service.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-favorite-adverts',
  templateUrl: './favorite-adverts.component.html',
  styleUrls: ['./favorite-adverts.component.scss']
})
export class FavoriteAdvertsComponent implements OnInit {

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
    this.advertService.getAllUserFavouriteAdvert(currentPageNumber).subscribe(data => {
      this.pageSize = data.pageSize
      this.totalCount = data.totalCount
      this.advertsArray = data;
    })
  }

}
