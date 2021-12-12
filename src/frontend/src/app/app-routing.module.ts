import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./shared/home/home.component";
import {AuthPageComponent} from "./shared/auth-page/login/auth-page.component";
import {RegisterComponent} from "./shared/auth-page/register/register.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: AuthPageComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
