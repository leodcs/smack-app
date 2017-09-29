import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, NavParams } from 'ionic-angular';
import { AuthService } from "../../providers/auth.service";
import { Message } from "../../models/message.model";
import { Chat } from "../../models/chat.model";
import { MessageProvider } from "../../providers/message.provider";
import { Broadcaster, Ng2Cable } from "ng2-cable";
import { apiHostUrl } from "../../environment";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  messages:Message[] = [];
  pageTitle:string;
  chat:Chat;

  constructor(private authService: AuthService,
              private navParams: NavParams,
              private messageProvider: MessageProvider,
              private ng2Cable: Ng2Cable,
              private messagesBroadcaster: Broadcaster) {}

  ionViewCanEnter() {
    return this.authService.isAuthenticated();
  }

  ionViewDidLoad() {
    this.chat = this.navParams.get('chat');
    this.pageTitle = this.chat.title;
    this.getMessages();
    this.listenToBroadcaster();
    this.scrollToBottom();
  }

  ionViewDidLeave() {
    this.ng2Cable.unsubscribe();
  }

  sendMessage(newMessageText: string) {
    if (newMessageText) {
      this.messageProvider.create(newMessageText, this.authService.currentUser.uid, this.chat.id).subscribe();
    }
  }

  getMessageClass(message: Message):string {
    if (message.userId == this.authService.currentUser.uid) {
      return("pull-right");
    }else {
      return("pull-left");
    }
  }

  private getMessages() {
      this.messageProvider.getMessages(this.chat.id)
        .subscribe((messages: Message[]) => this.messages = messages);
  }

  private listenToBroadcaster() {
    this.ng2Cable.subscribe( `${apiHostUrl}/cable`, 'ChatChannel', {
      chat_id: this.chat.id
    });
    this.messagesBroadcaster.on('CreateMessage').subscribe(
      (message: Message) => {
        this.messages.push(message);
        this.scrollToBottom();
      }
    );
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.content._scroll) this.content.scrollToBottom();
    }, 100);
  }
}
