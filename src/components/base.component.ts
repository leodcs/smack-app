import { AlertController, App } from "ionic-angular";
import { AuthService } from "../providers/auth.service";
import { SignInPage } from "../pages/sign-in/sign-in";

export abstract class BaseComponent {

  constructor(public alertCtrl: AlertController,
              public authService: AuthService,
              public appCtrl: App) {
  }

  onSignOut() {
    const alert = this.alertCtrl.create({
      title: "Sair",
      message: "Você deseja mesmo sair?",
      buttons: [
        {
          text: "Não"
        },
        {
          text: "Sim",
          handler: () => {
            this.authService.signOut()
              .then(()=>{
                this.appCtrl.getRootNav().setRoot(SignInPage);
              });
          }
        }
      ]
    });
    alert.present();
  }
}
