import { Component, OnInit } from '@angular/core';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import {UserService} from "../../shared/services/user-service.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AuthService} from "../../shared/services/auth-service.service";
import {UpdateUser} from "../../shared/models/update-user";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  val?: number = 3;

  faPhoneAlt = faPhoneAlt;
  faEnvelope = faEnvelope;
  faHome = faHome;

  user!: any;

  constructor(private userService: UserService, private afStorage: AngularFireStorage, public authService: AuthService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(data => {
      this.user = data;
    });
  }

  uploadImage(e: Event) {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    const f = files.item(0);

    let filePath = `UserPFP/${
      f?.name
    }_${new Date().getTime()}`;
    let fileRef = this.afStorage.ref(filePath);

    this.afStorage
      .upload(filePath, f)
      .then(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          if(url) {
            const userData: UpdateUser = {
              userName: this.user.userName,
              email: this.user.userEmail,
              phoneNumber: this.user.userPhoneNumber,
              userPhotoUrl: url,
              districtId: this.user.districtId
            }

            this.userService.updateUser(userData, this.user.userId).subscribe( () => {
                this.messageService.add({key: 'main', severity:'success', summary:'Sucesso', detail:'Imagem alterada'});
                this.userService.getUser().subscribe(data => {
                  this.user = data;
                });
            });
          }
        })
      })
      .catch(error => {
        console.log(error.code)
        if(error.code == 'storage/unauthorized') {
          this.messageService.add({key: 'main', severity:'error', summary:'Erro', detail:'O ficheiro tem de ser imagem e no maximo 2 MB'});
        }
      })
  }

}
