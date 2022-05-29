import { Component, OnInit } from '@angular/core';

import {MenuItem} from "primeng/api";
import {AuthService} from "../services/auth-service.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user-service.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];
  userName!: string;
  userPhotoUrl?: string;

  constructor(public authService: AuthService, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getUser().subscribe(data => {
      this.userPhotoUrl = data?.userPhotoUrl;
    });

    this.items = [
      {label: 'Perfil', icon: 'pi pi-fw pi-user', command: (click) => [this.router.navigate(['/user'])]},
      {label: 'Meus Anúncios', icon: 'pi pi-fw pi-briefcase', command: (click) => [this.router.navigate(['/adverts/userAdverts'])]},
      {label: 'Favoritos', icon: 'pi pi-fw pi-heart', command: click => {this.router.navigate(['/adverts/favoriteAdverts'])}},
      {
        label: 'Sair', icon: 'pi pi-fw pi-sign-out', command: (click) => {
          this.authService.SignOut()
        }
      }
    ];
  }
}
