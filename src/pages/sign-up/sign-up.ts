import { Component } from '@angular/core';
import { IonicPage, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../providers/user.service";
import { AuthService } from "../../providers/auth.service";
import { emailRegexp } from "../../environment";

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  signUpForm:FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private authService: AuthService,
              private toastCtrl: ToastController) {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegexp)])],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit():void {
    const formUser = this.signUpForm.value;
    this.authService.signIn(formUser.email, formUser.password)
      .then((user) => {
        formUser.uid = user.uid;
        delete formUser.password;
        this.userService.createUser(formUser);
        this.toastCtrl.create({
          message: "Cadastrado com sucesso.",
          duration: 2000
        }).present();
      });
  }
}
