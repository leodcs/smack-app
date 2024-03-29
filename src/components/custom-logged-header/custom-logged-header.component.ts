import { Component, Input } from '@angular/core';
import { BaseComponent } from "../base.component";
import { AlertController, App } from "ionic-angular";
import { AuthProvider } from "../../providers/auth.provider";

@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.component.html'
})
export class CustomLoggedHeaderComponent extends BaseComponent {
  @Input() title: string;

  constructor(public alertCtrl: AlertController,
              public authProvider: AuthProvider,
              public app: App) {
    super(alertCtrl, authProvider, app);
  }

}
