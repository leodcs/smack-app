import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "../../providers/auth.service";
import { emailRegexp } from "../../environment";
import { HomePage } from "../home/home";
import { UserProvider } from "../../providers/user.provider";

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  signUpForm:FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private navCtrl: NavController,
              private userProvider: UserProvider) {
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
      this.authService.signUp(formUser.email, formUser.password)
        .then((user) => {
          // formUser.uid = user.uid;
          delete formUser.password;
          const uuid:string = user.uid;
          this.userProvider.createUser(formUser, uuid)
            .subscribe(() => {
              this.toastCtrl.create({
                message: "Cadastrado com sucesso.",
                duration: 2000
              }).present();
              this.navCtrl.setRoot(HomePage).then(() => {
                loading.dismiss();
              });
            });
        })
        .catch((error: any) => {
          loading.dismiss();
          this.alertCtrl.create({
            title: "Erro!",
            message: error,
            buttons: ['Ok']
          }).present();
        });
    });
  }
}
