import {Component, OnInit, ViewChild} from '@angular/core';
import {AdvertService} from "../../shared/services/advert-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

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
  id!: number;
  overlays: any = [];
  options: any;

  constructor(private advertService: AdvertService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })

    this.options = {
      center: {lat: 38.74420911509797, lng: -9.148299476176284},
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
    });
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
        this.advertService.deleteAdvert(this.id).subscribe()
        Swal.fire('Anuncio apagado!').then(() => {
          this.router.navigate(['/adverts/userAdverts'])
        })

      }
    })
  }
}
