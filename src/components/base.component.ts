import { AlertController, App } from "ionic-angular";
import { SignInPage } from "../pages/sign-in/sign-in";
import { AuthProvider } from "../providers/auth.provider";

export abstract class BaseComponent {

  constructor(public alertCtrl: AlertController,
              public authProvider: AuthProvider,
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
            this.authProvider.signOut()
              .subscribe(()=>{
                this.appCtrl.getRootNav().setRoot(SignInPage);
              });
          }
        }
      ]
    });
    alert.present();
  }
}
