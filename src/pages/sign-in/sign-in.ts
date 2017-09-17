import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController } from 'ionic-angular';
import { SignUpPage } from "../sign-up/sign-up";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "../../providers/auth.service";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  signUpPage = SignUpPage;
  signInForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private alertCtrl: AlertController) {
    this.signInForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit():void {
    const loading = this.loadingCtrl.create({ content: 'Iniciando sessão...'});
    loading.present();
    this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password)
      .then(()=>{
        this.navCtrl.setRoot(HomePage);
        loading.dismiss();
      }).
    catch((error:any) => {
      loading.dismiss();
      this.alertCtrl.create({
        title: 'Erro!',
        message: error,
        buttons: ['Ok']
      }).present();
    });
  }
}
