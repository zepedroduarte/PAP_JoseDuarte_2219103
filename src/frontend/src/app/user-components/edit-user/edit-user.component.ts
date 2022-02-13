import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth-service.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {UserService} from "../../shared/services/user-service.service";
import {Districs} from "../../shared/models/districs";
import {UpdateUser} from "../../shared/models/update-user";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private messageService: MessageService, private userService: UserService) { }

  districts!: Districs[];
  form!: FormGroup;
  user?: any;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [``, [Validators.required, Validators.maxLength(100)]],
      phoneNumber: ['', [Validators.required]],
      district: ['', Validators.required]
    });

    this.authService.getDistricts().subscribe(
      data => {
        this.districts = data
      }
    )

    this.userService.getUser().subscribe( data => {
      this.user = data;
      this.name?.setValue(data.userName)
      this.phoneNumber?.setValue(data.userPhoneNumber)
      this.district?.setValue(this.districts.find(d => d.districtName == data.districtName))
    })
  }

  edit() {
    const userData: UpdateUser = {
      userName: this.name?.value,
      email: this.user.userEmail,
      phoneNumber: this.phoneNumber?.value,
      userPhotoUrl: this.user.userPhotoUrl,
      districtId: this.district?.value.districtsId
    }

    this.userService.updateUser(userData, this.user.userId).subscribe( () => {
      this.messageService.add({key: 'main', severity:'success', summary:'Sucesso', detail:'Dados alterados'});
      this.userService.getUser().subscribe(data => {
        this.user = data;
      });
      this.router.navigate(['/user'])
    });
  }

  get name(){
    return this.form.get('name');
  }

  get phoneNumber(){
    return this.form.get('phoneNumber');
  }

  get district() {
    return this.form.get('district')
  }

}
