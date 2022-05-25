import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {UserService} from "../../shared/services/user-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import {AdvertService} from "../../shared/services/advert-service.service";
import {Rating} from "../../shared/models/rating";

interface UserRating{
  name: string,
}

@Component({
  selector: 'app-advert-user-profile',
  templateUrl: './advert-user-profile.component.html',
  styleUrls: ['./advert-user-profile.component.scss']
})
export class AdvertUserProfileComponent implements OnInit {

  user!: any;
  advertsArray?: any;
  id!: string;
  val!: number;
  faPhoneAlt = faPhoneAlt;
  faEnvelope = faEnvelope;
  faHome = faHome;
  userId!: number;
  rating?: number;
  totalCount!: number;
  pageSize!: number;
  userIdRated!: number;

  constructor(private location: Location, private userService: UserService, private route: ActivatedRoute, private router: Router, private advertService: AdvertService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']

      if(!(this.id != null && this.id != "" && !isNaN(Number(this.id)))) {
        this.router.navigate(['']);
      }
    })

    this.userService.getUserById(parseInt(this.id)).subscribe(data => {
      this.user = data
    })

    this.userService.getUserRatingById(parseInt(this.id)).subscribe(data => {
      this.rating = data.RatedUserStars
    })

    this.userService.getUser().subscribe(data=> {
      this.userId = data!.userId

      this.userService.getUserRating(parseInt(this.id), this.userId).subscribe(data => {
        this.val = data?.RatedUserStars
        this.userIdRated = data.UserIdRated
      })
    })

    this.getAdvertsByUserId(1)
  }

  getAdvertsByUserId(currentPage: number) {
    this.advertService.getAdvertsByUserId(parseInt(this.id), currentPage).subscribe(data=> {
      this.advertsArray = data;
      this.totalCount = data.totalCount;
      this.pageSize = data.pageSize;
    })
  }

  Rate() {
    const rating: Rating = {
      userIdRated: this.userIdRated,
      ratedUserStars: this.val,
      userIdEvaluated: parseInt(this.id)
    }

    if(this.userId == this.userIdRated) {
      this.userService.userUpdateRateUser(rating).subscribe( () => {
        this.userService.getUserRatingById(parseInt(this.id)).subscribe(data => {
          this.rating = data.RatedUserStars
        })
      })
      return
    }

    this.userService.userRateUser(rating).subscribe( () => {
      this.userService.getUserRatingById(parseInt(this.id)).subscribe(data => {
        this.rating = data.RatedUserStars
      })
    })
  }

  back() {
    this.location.back();
  }

}
