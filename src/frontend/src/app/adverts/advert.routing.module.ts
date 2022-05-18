import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CreateAdvertComponent} from "./create-advert/create-advert.component";
import {UserAdvertsComponent} from "./user-adverts/user-adverts.component";
import {AdvertComponent} from "./advert/advert.component";
import {EditAdvertComponent} from "./edit-advert/edit-advert.component";
import {MainAdvertsPageComponent} from "./main-adverts-page/main-adverts-page.component";
import {FavoriteAdvertsComponent} from "./favorite-adverts/favorite-adverts.component";


const advertRoutes: Routes = [
  {path: 'userAdverts', component: UserAdvertsComponent},
  {path: 'createAdvert', component: CreateAdvertComponent},
  {path: 'advert/:id', component: AdvertComponent},
  {path: 'editAdvert/:id', component: EditAdvertComponent},
  {path: 'mainAdvertPage', component: MainAdvertsPageComponent},
  {path: 'favoriteAdverts', component: FavoriteAdvertsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(advertRoutes)],
  exports: [RouterModule]
})

export class AdvertRoutingModule { }
