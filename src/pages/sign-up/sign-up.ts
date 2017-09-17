import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, ToastController } from 'ionic-angular';
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
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
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
        this.userService.usernameExists(formUser.username)
          .first()
          .subscribe((usernameExists: boolean) => {
            if (usernameExists) {
              loading.dismiss();
              this.alertCtrl.create({
                title: "Erro!",
                message: `O nome de usuário ${formUser.username} já está sendo utilizado por uma outra conta.`,
                buttons: ['Ok']
              }).present();
            }else{
              loading.dismiss();
              this.authService.signIn(formUser.email, formUser.password)
                .then((user) => {
                  formUser.uid = user.uid;
                  delete formUser.password;
                  this.userService.createUser(formUser);
                  loading.dismiss();
                  this.toastCtrl.create({
                    message: "Cadastrado com sucesso.",
                    duration: 2000
                  }).present();
                })
                .catch((error: any) => {
                  loading.dismiss();
                  this.alertCtrl.create({
                    title: "Erro!",
                    message: error,
                    buttons: ['Ok']
                  }).present();
                });
            }
          });
      });
  }
}
