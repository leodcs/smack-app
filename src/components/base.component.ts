import { AlertController, App, MenuController, NavController } from "ionic-angular";
import { AuthService } from "../providers/auth.service";
import { OnInit } from "@angular/core";
import { SignInPage } from "../pages/sign-in/sign-in";

export abstract class BaseComponent implements OnInit {
  protected navCtrl: NavController;

  constructor(public alertCtrl: AlertController,
              public authService: AuthService,
              public app: App,
              public menuCtrl: MenuController) {}

  ngOnInit() {
    this.navCtrl = this.app.getActiveNav();
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
                this.navCtrl.setRoot(SignInPage);
              });
          }
        }
      ]
    });
    alert.present();
  }
}
