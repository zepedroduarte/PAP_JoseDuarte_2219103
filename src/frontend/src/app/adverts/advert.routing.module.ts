import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CreateAdvertComponent} from "./create-advert/create-advert.component";


const advertRoutes: Routes = [
  {path: '', component: CreateAdvertComponent},
];

@NgModule({
  imports: [RouterModule.forChild(advertRoutes)],
  exports: [RouterModule]
})

export class AdvertRoutingModule { }
