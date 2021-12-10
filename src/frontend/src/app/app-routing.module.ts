import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./shared/home/home.component";
import {AuthPageComponent} from "./shared/auth-page/auth-page.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  { path: 'login', component: AuthPageComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
