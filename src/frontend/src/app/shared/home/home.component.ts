import { Component, OnInit } from '@angular/core';

import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {faPlus} from  "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faSearch = faSearch;
  faPlus = faPlus;

  constructor() { }

  ngOnInit(): void {
  }

}
