import { Component, OnInit } from '@angular/core';
import {AdvertService} from "../../shared/services/advert-service.service";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {faPlus} from  "@fortawesome/free-solid-svg-icons"
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth-service.service";
import {UserService} from "../../shared/services/user-service.service";

interface Gender{
  name: string,
}

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
  form!: FormGroup
  genders: Gender[];
  categories?: any;
  isLoggedIn?: boolean = false;

  constructor(private advertService: AdvertService, private formBuilder: FormBuilder, private authService: AuthService, private userService: UserService ) {
    this.genders = [
      {name: 'Rapaz'},
      {name: 'Rapariga'},
      {name: 'Unisexo'}
    ]
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn) {
      this.isLoggedIn = true
    }

    this.advertService.getCategories().subscribe(data => {
      this.categories = data
    })

    this.getAllAdverts(1);

    this.form = this.formBuilder.group({
      category: [''],
      gender: [''],
      minPrice: [ '', [Validators.pattern("^[0-9]*$")]],
      maxPrice: [ '', [Validators.pattern("^[0-9]*$")]],
      title: [''],
    })
  }

  getAllAdverts(currentPage: number) {
    this.advertService.getAllAdverts(currentPage).subscribe(data => {
      this.advertsData = data
      this.pageSize = data.pageSize
      this.totalCount = data.totalCount
    });
  }

  getAllAdvertsFiltered(currentPageNumber: number) {

    this.advertService.getAllAdvertsFiltered(currentPageNumber, this.gender?.value.name, (this.category?.value.categoryName == undefined ? '' : this.category?.value.categoryName)  , this.minPrice?.value.toString(), this.maxPrice?.value.toString(), this.title?.value).subscribe(
     data => {
       this.advertsData = data
       this.pageSize = data.pageSize
       this.totalCount = data.totalCount
     })
  }

  get category() {
    return this.form.get('category');
  }

  get gender() {
    return this.form.get('gender')
  }

  get minPrice() {
    return this.form.get('minPrice')
  }

  get maxPrice() {
    return this.form.get('maxPrice')
  }

  get title() {
    return this.form.get('title')
  }
}
