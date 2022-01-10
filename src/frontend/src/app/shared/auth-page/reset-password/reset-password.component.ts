import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth-service.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor( private messageService: MessageService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  resetPassword(email: string) {
    this.authService.ForgotPassword(email).then(() => {
      this.messageService.add({key: 'main', severity:'success', summary:'Sucesso', detail:'Email de recuperação enviado!'})
    }).catch(error => {

      if(error.code == 'auth/invalid-email') {
        this.messageService.add({severity:'error', summary:'Erro', detail:'Email invalido.'});
      }

      if(email == ''){
        this.messageService.add({severity:'error', summary:'Erro', detail:'Preencha o campo de email.'});
      }

      if(error.code == 'auth/user-not-found'){
        this.messageService.add({severity:'error', summary:'Erro', detail:'O e-mail está errado.'});
      }

    })
  }

}
