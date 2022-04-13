import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateAdvertComponent} from "./create-advert/create-advert.component";
import {AdvertRoutingModule} from "./advert.routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {GMapModule} from "primeng/gmap";
import {InputTextareaModule} from "primeng/inputtextarea";
import {UserAdvertsComponent} from "./user-adverts/user-adverts.component";
import {PanelModule} from 'primeng/panel';
import {PaginatorModule} from "primeng/paginator";
import {AdvertComponent} from "./advert/advert.component";
import {AvatarModule} from "primeng/avatar";
import {DividerModule} from "primeng/divider";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    CreateAdvertComponent,
    UserAdvertsComponent,
    AdvertComponent,
  ],
  imports: [
    CommonModule,
    AdvertRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    GMapModule,
    InputTextareaModule,
    PanelModule,
    PaginatorModule,
    AvatarModule,
    DividerModule,
    FontAwesomeModule
  ],
  providers: [

  ]
})
export class AdvertModule { }
