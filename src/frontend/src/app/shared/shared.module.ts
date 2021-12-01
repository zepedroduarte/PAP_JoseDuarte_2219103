import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import {MenubarModule} from 'primeng/menubar';

import {ConfirmDialogModule} from "primeng/confirmdialog";
import {AvatarModule} from "primeng/avatar";
import {MenuModule} from "primeng/menu";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    ConfirmDialogModule,
    AvatarModule,
    MenuModule,
    FontAwesomeTestingModule,
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
