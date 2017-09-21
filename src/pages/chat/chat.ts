import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { AuthService } from "../../providers/auth.service";
import { User } from "../../models/user.model";
import { Message } from "../../models/message.model";
import { MessageService } from "../../providers/message.service";
import { ChatService } from "../../providers/chat.service";
import { AngularFireDatabase } from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  messages:Message[] = [];
  pageTitle:string;
  recipient:User;
  sender;

  constructor(public authService: AuthService,
              private navParams: NavParams,
              private messageService: MessageService,
              private chatService: ChatService,
              private database: AngularFireDatabase) {}

  ionViewCanEnter() {
    // return this.authService.isAuthenticated();
    return true;
  }

  ionViewWillEnter() {
    this.recipient = this.navParams.get('recipient');
    this.pageTitle = this.recipient.name;
    this.sender = this.authService.currentUser;
    this.getMessages();
  }

  sendMessage(newMessageText: string) {
    if (newMessageText) {
      this.messageService.create(newMessageText, this.sender.uid, this.recipient.$key);
      this.chatService.getDeepChat(this.sender.uid, this.recipient.$key)
        .subscribe((chat) => {
          this.database.object(`/chats/${this.sender.uid}/${chat.$key}`)
            .update({ lastMessage: newMessageText });
        });
    }
  }

  private getMessages() {
    this.messageService.getMessages(this.sender.uid, this.recipient.$key)
      .subscribe((messages1: Message[]) => {
        if ( messages1.length > 0 ) {
          this.messages = messages1;
        } else{
          this.messageService.getMessages(this.recipient.$key, this.sender.uid)
            .subscribe((messages2: Message[]) => {
              this.messages = messages2;
            });
        }
      });
  }
}
