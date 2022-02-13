import { Component, OnInit } from '@angular/core';
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})

export class PageNotFoundComponent implements OnInit {

  faHeartBroken = faHeartBroken

  constructor() { }

  ngOnInit(): void {
  }

}
