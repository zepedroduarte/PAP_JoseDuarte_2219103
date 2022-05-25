import {Component, OnInit, ViewChild} from '@angular/core';
import {AdvertService} from "../../shared/services/advert-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import {UserService} from "../../shared/services/user-service.service";
import {Location} from "@angular/common";
import {AuthService} from "../../shared/services/auth-service.service";
import {UserFavouriteAdvert} from "../../shared/models/userFavouriteAdvert";

declare var google: any;

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.scss']
})
export class AdvertComponent implements OnInit {

  @ViewChild('gmap') gmap: any;

  phoneIcon = faPhoneAlt;
  emailIcon = faEnvelope;
  advertData?: any;
  id!: string;
  overlays: any = [];
  options: any;
  userId!: number;
  isOwner: boolean = false;
  favoriteAdverts: any = [];

  constructor(private advertService: AdvertService, private route: ActivatedRoute, private router: Router, private userService: UserService, private location: Location, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']

      if(!(this.id != null && this.id != "" && !isNaN(Number(this.id)))) {
        this.router.navigate(['']);
      }
    })

    this.userService.getUser().subscribe(data => {
      console.log(data.userId)

      this.advertService.getUserFavouriteAdvert(data.userId, parseInt(this.id)).subscribe(data => {
        this.favoriteAdverts = data
      })
    })


    this.options = {
      center: {lat: 38.74420911509797, lng: -9.148299476176284},
      zoom: 9
    };

    this.advertService.getAdvert(parseInt(this.id)).subscribe( data => {
      this.advertData = data

      console.log(data)

      this.gmap.map.setCenter(new google.maps.LatLng(data.mapLocationsLat, data.mapLocationsLng));
      this.gmap.map.panTo(new google.maps.LatLng(data.mapLocationsLat, data.mapLocationsLng));
      google.maps.event.trigger(this.gmap.map, "resize");

      this.overlays.push(new google.maps.Marker({
        position: {lat: data.mapLocationsLat, lng: data.mapLocationsLng},
        title: data.productsTitle
       }));

      this.isOwner = data.productsUserId == this.authService.user.userId ? true : false

    });
  }

  advertFavorite() {
    if(this.favoriteAdverts[0]?.productId == undefined){
      var addFavorite: UserFavouriteAdvert = {
        userId: this.userId,
        productId: parseInt(this.id)
      }

      this.advertService.addUserFavouriteAdvert(addFavorite).subscribe()

      window.location.reload()
    }
    else if(this.favoriteAdverts[0]?.productId == this.id) {
      this.advertService.removeUserFavouriteAdvert(this.favoriteAdverts[0]?.productId).subscribe()

      window.location.reload()
    }
  }

  deleteAdvertButton() {
    this.advertDeleted()
  }

  advertDeleted() {
    Swal.fire({
      title: 'Tem a certeza que quer apagar?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.advertService.deleteAdvert(parseInt(this.id)).subscribe()
        Swal.fire('Anuncio apagado!').then(() => {
          this.router.navigate(['/adverts/userAdverts'])
        })

      }
    })
  }

  back() {
    this.location.back();
  }

}
