import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {InputTextModule} from "primeng/inputtext";
import {DividerModule} from "primeng/divider";
import {CardModule} from "primeng/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {HttpClientModule} from "@angular/common/http";
import {RatingModule} from "primeng/rating";
import {MessageService} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {UserRoutingModule} from "./user.routing.module";
import {AdvertUserProfileComponent} from "./advert-user-profile/advert-user-profile.component";
import {PaginatorModule} from "primeng/paginator";

@NgModule({
  declarations: [
    UserProfileComponent,
    EditUserComponent,
    AdvertUserProfileComponent
  ],
    imports: [
        CommonModule,
        FontAwesomeTestingModule,
        InputTextModule,
        DividerModule,
        CardModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        RippleModule,
        DropdownModule,
        HttpClientModule,
        RatingModule,
        ButtonModule,
        UserRoutingModule,
        PaginatorModule
    ],
  providers: [
    MessageService
  ]
})
export class UserModule { }
