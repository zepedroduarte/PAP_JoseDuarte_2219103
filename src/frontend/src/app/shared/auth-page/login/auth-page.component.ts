import { Component, OnInit } from '@angular/core';

import {MessageService} from 'primeng/api';
import {AuthService} from '../../services/auth-service.service'


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  constructor(private messageService: MessageService, public authService: AuthService) { }

  ngOnInit(): void {
  }

  login(email: string, password: string) {

    this.authService.SignIn(email, password).catch(error => {

      if(error.code == 'auth/invalid-email' || error.code == 'auth/internal-error' ) {
        this.messageService.add({severity:'error', summary:'Erro', detail:'Preencha todos os campos'});
      }

      if(error.code == 'auth/user-not-found' || error.code == 'auth/wrong-password'){
        this.messageService.add({severity:'error', summary:'Erro', detail:'O e-mail ou a password estão errados'});
      }

      if(error.code == 'auth/invalid-email-verified') {
        this.messageService.add({severity:'error', summary:'Erro', detail:'O e-mail não esta verificado'});
      }

    })
  }

}
