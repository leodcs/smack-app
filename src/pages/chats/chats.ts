import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../providers/auth.service";

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
