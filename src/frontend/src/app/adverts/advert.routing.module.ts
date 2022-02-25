import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CreateAdvertComponent} from "./create-advert/create-advert.component";
import {UserAdvertsComponent} from "./user-adverts/user-adverts.component";


const advertRoutes: Routes = [
  {path: 'userAdvert', component: UserAdvertsComponent},
  {path: 'createAdvert', component: CreateAdvertComponent},
];

@NgModule({
  imports: [RouterModule.forChild(advertRoutes)],
  exports: [RouterModule]
})

export class AdvertRoutingModule { }
