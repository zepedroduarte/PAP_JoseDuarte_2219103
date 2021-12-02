import { Component, OnInit } from '@angular/core';

import {MenuItem} from "primeng/api";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];



  isAuthenticated: boolean = false;

  constructor() {}

  ngOnInit() {
    this.items = [
      {label: 'Perfil', icon: 'pi pi-fw pi-user'},
      {label: 'Mensagens', icon: 'pi pi-fw pi-comments'},
      {label: 'Meus Anuncios', icon: 'pi pi-fw pi-briefcase'},
      {label: 'Favoritos', icon: 'pi pi-fw pi-heart'},
      {label: 'Sair', icon: 'pi pi-fw pi-sign-out'}
    ];
  }

  Authenticate() {
    this.isAuthenticated = true;
  }
}
