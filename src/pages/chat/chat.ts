import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { AuthService } from "../../providers/auth.service";
import { Message } from "../../models/message.model";
import { MessageService } from "../../providers/message.service";
import { Chat } from "../../models/chat.model";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  messages:Message[] = [];
  pageTitle:string;
  chat:Chat;
  sender;

  constructor(public authService: AuthService,
              private navParams: NavParams,
              private messageService: MessageService) {}

  ionViewCanEnter() {
    // return this.authService.isAuthenticated();
    return true;
  }

  ionViewWillEnter() {
    this.chat = this.navParams.get('chat');
    this.pageTitle = this.chat.title;
    this.sender = this.authService.currentUser;
    this.getMessages();
  }

  sendMessage(newMessageText: string) {
    if (newMessageText) {
      this.messageService.create(newMessageText, this.sender.uid, this.chat.$key);
    }
  }

  private getMessages() {
    this.messageService.getMessages(this.sender.uid, this.chat.$key)
      .subscribe((messages1: Message[]) => {
        if ( messages1.length > 0 ) {
          this.messages = messages1;
        } else{
          this.messageService.getMessages(this.chat.$key, this.sender.uid)
            .subscribe((messages2: Message[]) => {
              this.messages = messages2;
            });
        }
      });
  }
}
