import { Component, OnInit } from '@angular/core';

import {MessageService} from 'primeng/api';
import {Router} from  '@angular/router'
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
    if(email == '' || password == '') {
      this.messageService.add({severity:'error', summary:'Erro', detail:'Preencha todos os campos'});
    }

    if(email == 'ola@gmail.com' && password == '123') {

    }
    else if(email != 'ola@gmail.com' && email != '' && password != '123' && password != '') {
      this.messageService.add({severity:'warn', summary:'Alerta', detail:'Email ou palavra-passe incorreto'})
    }
  }

}
