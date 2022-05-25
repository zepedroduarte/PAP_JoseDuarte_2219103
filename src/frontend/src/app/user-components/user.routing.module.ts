import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {AdvertUserProfileComponent} from "./advert-user-profile/advert-user-profile.component";

const userRoutes: Routes = [
  {path: '', component: UserProfileComponent},
  {path: 'editUser', component:  EditUserComponent},
  {path: 'advert-user-profile/:id', component: AdvertUserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})

export class UserRoutingModule {}
