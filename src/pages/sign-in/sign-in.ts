import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController } from 'ionic-angular';
import { SignUpPage } from "../sign-up/sign-up";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HomePage } from "../home/home";
import { emailRegexp } from "../../environment";
import { AuthProvider } from "../../providers/auth.provider";

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  signUpPage = SignUpPage;
  signInForm: FormGroup;
  homePage = HomePage;

  constructor(private formBuilder: FormBuilder,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private authProvider: AuthProvider) {
    this.signInForm = this.formBuilder.group({
      email: ['aleotory@gmail.com', Validators.compose([Validators.required, Validators.pattern(emailRegexp)])],
      password: ['123mudar']
    });
  }

  onSubmit():void {
    const loading = this.loadingCtrl.create({ content: 'Iniciando sessão...'});
    loading.present();
    this.authProvider.signIn(this.signInForm.value.email, this.signInForm.value.password)
      .subscribe(()=> {
        this.navCtrl.setRoot(HomePage);
        loading.dismiss();
      },
      (res) => {
      loading.dismiss();
      this.alertCtrl.create({
        title: 'Erro!',
        message: res._body,
        buttons: ['Ok']
      }).present();
    });
  }
}
