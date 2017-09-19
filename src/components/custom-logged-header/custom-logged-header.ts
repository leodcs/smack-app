import { Component, Input } from '@angular/core';
import { BaseComponent } from "../base.component";
import { AlertController, App } from "ionic-angular";
import { AuthService } from "../../providers/auth.service";

@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.html'
})
export class CustomLoggedHeaderComponent extends BaseComponent {
  @Input() title: string;

  constructor(public alertCtrl: AlertController,
              public authService: AuthService,
              public app: App) {
    super(alertCtrl, authService, app);
  }

}