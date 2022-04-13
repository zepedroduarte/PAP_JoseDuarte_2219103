import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CreateAdvertComponent} from "./create-advert/create-advert.component";
import {UserAdvertsComponent} from "./user-adverts/user-adverts.component";
import {AdvertComponent} from "./advert/advert.component";


const advertRoutes: Routes = [
  {path: 'userAdverts', component: UserAdvertsComponent},
  {path: 'createAdvert', component: CreateAdvertComponent},
  {path: 'advert/:id', component: AdvertComponent},
];

@NgModule({
  imports: [RouterModule.forChild(advertRoutes)],
  exports: [RouterModule]
})

export class AdvertRoutingModule { }
