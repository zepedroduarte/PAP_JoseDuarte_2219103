import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import {MenubarModule} from 'primeng/menubar';

import {ConfirmDialogModule} from "primeng/confirmdialog";
import {AvatarModule} from "primeng/avatar";
import {MenuModule} from "primeng/menu";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {HomeComponent } from '../home/home.component';
import {InputTextModule} from "primeng/inputtext";
import {DividerModule} from 'primeng/divider';
import {CardModule} from "primeng/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent } from './auth-page/register/register.component';
import {ToastModule} from 'primeng/toast';
import {AuthPageComponent} from "./auth-page/login/auth-page.component";
import {CheckboxModule} from "primeng/checkbox";
import {MessageService} from "primeng/api";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {HttpClientModule} from "@angular/common/http";
import {ResetPasswordComponent } from './auth-page/reset-password/reset-password.component';
import {RatingModule} from "primeng/rating";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    AuthPageComponent,
    RegisterComponent,
    ResetPasswordComponent,
    PageNotFoundComponent
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
        CardModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        CheckboxModule,
        RippleModule,
        DropdownModule,
        HttpClientModule,
        RatingModule
    ],
  exports: [
    NavbarComponent,
    HomeComponent
  ],
  providers: [
    MessageService
  ]
})
export class SharedModule { }
