import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AuthService } from "../../providers/auth.service";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  messages:string[] = [];

  constructor(public authService: AuthService) {}

  ionViewCanEnter() {
    // return this.authService.isAuthenticated();
    return true;
  }

  sendMessage(message: string) {
    this.messages.push(message);
  }

}
