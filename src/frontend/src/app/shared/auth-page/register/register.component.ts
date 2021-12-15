import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  cities: any;

  constructor() { }

  ngOnInit(): void {
    this.cities = [
      {name: 'New York'},
      {name: 'Rome'},
      {name: 'London'},
      {name: 'Istanbul'},
      {name: 'Paris'}
    ];
  }

}
