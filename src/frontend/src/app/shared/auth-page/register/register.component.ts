import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth-service.service";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup, FormGroupDirective, NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {CreateUser} from "../../models/user";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  districts: any;
  form!: FormGroup;

  constructor( private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required, passwordValidator('confirmPassword', true), Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, passwordValidator('password')]],
      district: ['', Validators.required]
    });

    this.authService.getDistricts().subscribe(
      data => {
        this.districts = data;
      }
    )

  }

  register(){
    this.authService.SignUp(this.email?.value, this.password?.value).then(data => {
        if(data) {
          const userData: CreateUser = {
            firebaseUid: data?.uid,
            userName: this.name?.value,
            email: this.email?.value,
            phoneNumber: this.phoneNumber?.value,
            districtId: this.district?.value.districtsId
          }

          this.authService.signUpDatabase(userData).subscribe(
            (response) => {
              this.router.navigate(['/login'])
            }
          )
        }
      }
    ).catch(error => {
      if(error.code == 'email-already-in-use') {
        this.messageService.add({severity:'error', summary:'Erro', detail:'Email já existente'})
      }
    })
  }

  get email(){
    return this.form.get('email');
  }

  get name(){
    return this.form.get('name');
  }

  get phoneNumber(){
    return this.form.get('phoneNumber');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword')
  }

  get district() {
    return this.form.get('district')
  }
}

export function passwordValidator(
  matchTo: string,
  reverse?: boolean
): ValidatorFn {
  return (control: AbstractControl):
    ValidationErrors | null => {
    if (control.parent && reverse) {
      const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
      if (c) {
        c.updateValueAndValidity();
      }
      return null;
    }
    return !!control.parent &&
    !!control.parent.value &&
    control.value ===
    (control.parent?.controls as any)[matchTo].value
      ? null
      : { matching: true };
  };
}
