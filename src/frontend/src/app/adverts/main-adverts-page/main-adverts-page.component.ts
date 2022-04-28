import { Component, OnInit } from '@angular/core';
import {AdvertService} from "../../shared/services/advert-service.service";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {faPlus} from  "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'app-main-adverts-page',
  templateUrl: './main-adverts-page.component.html',
  styleUrls: ['./main-adverts-page.component.scss']
})
export class MainAdvertsPageComponent implements OnInit {

  advertsData: any;
  totalCount!: number;
  pageSize!: number;
  faSearch = faSearch;
  faPlus = faPlus;
  display: any;

  constructor(private advertService: AdvertService) { }

  ngOnInit(): void {
    this.getAllAdverts(1);
  }

  getAllAdverts(currentPageNumber: number) {
    this.advertService.getAllAdverts(currentPageNumber).subscribe(data => {
      this.totalCount = data.totalCount
      this.pageSize = data.pageSize
      this.advertsData = data;
    })
  }
}
