import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { AuthService } from "../../providers/auth.service";
import { User } from "../../models/user.model";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  messages:string[] = [];
  pageTitle:string;
  recipient:User;
  sender;

  constructor(public authService: AuthService, private navParams: NavParams) {}

  ionViewCanEnter() {
    // return this.authService.isAuthenticated();
    return true;
  }

  ionViewDidLoad() {
    this.recipient = this.navParams.get('recipient');
    this.pageTitle = this.recipient.name;
    this.sender = this.authService.currentUser;
  }

  sendMessage(message: string) {
    this.messages.push(message);
  }
}
