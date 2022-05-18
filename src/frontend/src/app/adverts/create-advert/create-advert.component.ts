import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {CreateAdvert} from "../../shared/models/create-advert";
import {MessageService} from "primeng/api";
import {AdvertService} from "../../shared/services/advert-service.service";
import {UserData} from "../../shared/models/user";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {UserService} from "../../shared/services/user-service.service";
import {Location} from "@angular/common";

declare var google: any;

interface Gender{
  name: string,
}

@Component({
  selector: 'app-create-advert',
  templateUrl: './create-advert.component.html',
  styleUrls: ['./create-advert.component.scss']
})

export class CreateAdvertComponent implements OnInit {

  form!: FormGroup
  genders: Gender[];
  categories?: any;
  overlays: any;
  options: any;
  user?: any;


  constructor(private location: Location, private userService: UserService, private formBuilder: FormBuilder, private afStorage: AngularFireStorage, private messageService: MessageService, private advertServices: AdvertService, private router: Router) {
    this.genders = [
      {name: 'Rapaz'},
      {name: 'Rapariga'},
      {name: 'Unisexo'}
    ]
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      gender: ['', Validators.required],
      description: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      lat: [null, Validators.required],
      lng: [null, Validators.required],
      images: [ '', Validators.required],
      price: [ '', [Validators.required, Validators.pattern("^[0-9]*$")]],
    })

    this.options = {
      center: {lat: 38.77605768376176, lng: -9.16247321561838},
      zoom: 7
    };

    this.advertServices.getCategories().subscribe(
      data => {
        this.categories = data;
      }
    )

    this.userService.getUser().subscribe(data => {
      this.user = data;
    });

  }

  back() {
    this.location.back();
  }

  handleMapClick(event: any) {
    this.overlays = [
      new google.maps.Marker({position: {lat: event.latLng.toJSON().lat, lng: event.latLng.toJSON().lng}})
    ];

    this.lat?.setValue(event.latLng.toJSON().lat)
    this.lng?.setValue(event.latLng.toJSON().lng)
  };


  upload(e: Event) {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    const f = files.item(0);

    let filePath = `AdvertImages/${
      f?.name
    }_${new Date().getTime()}`;
    let fileRef = this.afStorage.ref(filePath);

    this.afStorage
      .upload(filePath, f)
      .then(() => {
        fileRef.getDownloadURL().subscribe((url) =>{
          if(url) {
            this.images?.setValue(url)
          }
        })
      })
      .catch(error => {
        console.log(error.code)
        if(error.code == 'storage/unauthorized') {
          this.messageService.add({key: 'main', severity:'error', summary:'Erro', detail:'O ficheiro tem de ser imagem e no maximo 2 MB'});
        }
      })
  }

  createAdvert() {


      const createAdvert: CreateAdvert = {
        productsTitle: this.title?.value,
        productsCategoryId: this.category?.value.categoryId,
        productsDescription: this.description?.value,
        productsEmail: this.email?.value,
        productsGender: this.gender?.value.name,
        lng: this.lng?.value,
        lat: this.lat?.value,
        productsPhoneNumber: this.phoneNumber?.value,
        productsPhotoUrl: this.images?.value,
        productsPrice: parseInt(this.price?.value),
        productsUserId: this.user!.userId
      }


      this.advertServices.createAdvert(createAdvert).subscribe(() => {
        this.alertAdvertCreated();
      })
  }

  alertAdvertCreated() {
    Swal.fire({
      title: 'Anuncio criado!',
      html: '',
      icon: 'success',
    }).then((response) => {
      this.form.reset();
      if(response.isConfirmed) {
        this.router.navigate(['/home'])
      }
    })
  }


  get email(){
    return this.form.get('email');
  }

  get title(){
    return this.form.get('title');
  }

  get phoneNumber(){
    return this.form.get('phoneNumber');
  }

  get category() {
    return this.form.get('category');
  }

  get gender() {
    return this.form.get('gender')
  }

  get lat() {
    return this.form.get('lat')
  }

  get lng() {
    return this.form.get('lng')
  }

  get description() {
    return this.form.get('description')
  }

  get images() {
    return this.form.get('images')
  }

  get price() {
    return this.form.get('price')
  }
}
