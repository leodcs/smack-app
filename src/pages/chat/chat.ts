import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { AuthService } from "../../providers/auth.service";
import { Message } from "../../models/message.model";
import { Chat } from "../../models/chat.model";
import { MessageProvider } from "../../providers/message.provider";
import { Broadcaster } from "ng2-cable";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  messages:Message[] = [];
  pageTitle:string;
  chat:Chat;

  constructor(private authService: AuthService,
              private navParams: NavParams,
              private messageProvider: MessageProvider,
              private messagesBroadcaster: Broadcaster) {}

  ionViewCanEnter() {
    return this.authService.isAuthenticated();
  }

  ionViewDidLoad() {
    this.chat = this.navParams.get('chat');
    this.pageTitle = this.chat.title;
    this.getMessages();
    this.listenToBroadcaster();
  }

  sendMessage(newMessageText: string) {
    if (newMessageText) {
      this.messageProvider.create(newMessageText, this.authService.currentUser.uid, this.chat.id).subscribe();
    }
  }

  private getMessages() {
      this.messageProvider.getMessages(this.chat.id)
        .subscribe((messages: Message[]) => this.messages = messages);
  }

  private listenToBroadcaster() {
    this.messagesBroadcaster.on('CreateMessage').subscribe(
      (message: Message) => {
        this.messages.push(message);
      }
    );
  }
}
