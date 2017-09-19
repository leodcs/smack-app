import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../providers/auth.service";

/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  isAuthenticated:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

}
