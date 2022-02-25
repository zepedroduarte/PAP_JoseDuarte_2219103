import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthPageComponent} from "./shared/auth-page/login/auth-page.component";
import {RegisterComponent} from "./shared/auth-page/register/register.component";
import {ResetPasswordComponent} from "./shared/auth-page/reset-password/reset-password.component";
import {PageNotFoundComponent} from "./shared/page-not-found/page-not-found.component";
import {AuthGuard} from "./shared/guard/auth.guard";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: AuthPageComponent},
  {path: 'resetPassword', component: ResetPasswordComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'adverts', loadChildren: () => import('./adverts/advert.module').then(m => m.AdvertModule), canActivate:[AuthGuard]},
  {path: 'user', loadChildren: () => import('./user-components/user.module').then(m => m.UserModule),  canActivate:[AuthGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', pathMatch: 'full', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule {}
