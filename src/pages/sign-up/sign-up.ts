import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { emailRegexp } from "../../environment";
import { HomePage } from "../home/home";
import { AuthProvider } from "../../providers/auth.provider";
import { User } from "../../models/user.model";

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  signUpForm:FormGroup;

  constructor(private formBuilder: FormBuilder,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private navCtrl: NavController,
              private authProvider: AuthProvider) {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegexp)])],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit():void {
    const loading = this.loadingCtrl.create({content: "Criando cadastro..."});
    const formUser = this.signUpForm.value;
    loading.present().then(() => {
      this.authProvider.signUp(formUser.name, formUser.email, formUser.password, formUser.username)
        .subscribe((user: User) => {
          this.toastCtrl.create({
            message: "Cadastrado com sucesso.",
            duration: 1500
          }).present();
          this.authProvider.signIn(formUser.email, formUser.password)
            .subscribe(() => {
              this.navCtrl.setRoot(HomePage).then(() => {
                loading.dismiss();
              });
            });
        },
        (error) => {
          console.log(error);
          loading.dismiss();
          this.alertCtrl.create({
            title: "Erro!",
            message: error._body,
            buttons: ['Ok']
          }).present();
        });
    });
  }
}
