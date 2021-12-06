import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import {MenubarModule} from 'primeng/menubar';

import {ConfirmDialogModule} from "primeng/confirmdialog";
import {AvatarModule} from "primeng/avatar";
import {MenuModule} from "primeng/menu";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import { HomeComponent } from './home/home.component';
import {InputTextModule} from "primeng/inputtext";
import {DividerModule} from 'primeng/divider';
import {CardModule} from "primeng/card";

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent
  ],
    imports: [
        CommonModule,
        MenubarModule,
        ConfirmDialogModule,
        AvatarModule,
        MenuModule,
        FontAwesomeTestingModule,
        InputTextModule,
        DividerModule,
        CardModule
    ],
  exports: [
    NavbarComponent,
    HomeComponent
  ]
})
export class SharedModule { }
