import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/services/user-service.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {MessageService} from "primeng/api";
import {AdvertService} from "../../shared/services/advert-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth-service.service";
import {UpdateAdvert} from "../../shared/models/updateAdvert";
declare var google: any;

interface Gender{
  name: string,
}

@Component({
  selector: 'app-edit-advert',
  templateUrl: './edit-advert.component.html',
  styleUrls: ['./edit-advert.component.scss']
})
export class EditAdvertComponent implements OnInit {

  @ViewChild('gmap') gmap: any;

  form!: FormGroup
  genders: Gender[];
  categories?: any;
  overlays: any = [];
  options: any;
  user?: any;
  id!: number;
  advertData: any;

  constructor(private formBuilder: FormBuilder, private afStorage: AngularFireStorage, private messageService: MessageService, private advertService: AdvertService, private router: Router, private route: ActivatedRoute) {
    this.genders = [
      {name: 'Rapaz'},
      {name: 'Rapariga'},
      {name: 'Unisexo'}
    ]
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })

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

    this.advertService.getCategories().subscribe(
      data => {
        this.categories = data;
        console.log(data);
      }
    )

    this.options = {
      center: {lat: 38.77605768376176, lng: -9.16247321561838},
      zoom: 9
    };

    this.advertService.getAdvert(this.id).subscribe( data => {
      this.advertData = data

      this.gmap.map.setCenter(new google.maps.LatLng(data.mapLocationsLat, data.mapLocationsLng));
      this.gmap.map.panTo(new google.maps.LatLng(data.mapLocationsLat, data.mapLocationsLng));
      google.maps.event.trigger(this.gmap.map, "resize");

      this.overlays.push(new google.maps.Marker({
        position: {lat: data.mapLocationsLat, lng: data.mapLocationsLng},
        title: data.productsTitle
      }));

      this.lat?.setValue(data.mapLocationsLat);
      this.lng?.setValue(data.mapLocationsLng);
      this.title?.setValue(data.productsTitle);
      this.email?.setValue(data.productsEmail);
      this.description?.setValue(data.productsDescription);
      this.phoneNumber?.setValue(data.productsPhoneNumber);
      this.images?.setValue(data.productsPhotoUrl);
      this.price?.setValue(data.productsPrice);
      this.category?.setValue(this.categories.find((x:any) => x.categoryName == data.categoryName));
      this.gender?.setValue(this.genders.find((x:any) => x.name == data.productsGender));

    });
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

  editAdvert() {
    const advertData: UpdateAdvert = {
      productsTitle: this.title?.value,
      productsDescription: this.description?.value,
      lng: this.lng?.value,
      lat: this.lat?.value,
      productsEmail: this.email?.value,
      productsGender: this.gender?.value.name,
      productsPrice: parseInt(this.price?.value),
      productsPhoneNumber: this.phoneNumber?.value,
      productsPhotoUrl: this.images?.value,
      productsCategoryId: this.category?.value.categoryId,
    }


    this.advertService.editAdvert(advertData, this.id).subscribe( () => {
      this.messageService.add({key: 'main', severity:'success', summary:'Sucesso', detail:'Dados alterados'});
      this.router.navigate([`/adverts/advert/${this.id}`])
    });
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
