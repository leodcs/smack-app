import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, NavParams } from 'ionic-angular';
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
  @ViewChild(Content) content: Content;
  messages:Message[] = [];
  pageTitle:string;
  chat:Chat;
  finishLoadingMessages:boolean = false;

  constructor(private authService: AuthService,
              private navParams: NavParams,
              private messageProvider: MessageProvider,
              private messagesBroadcaster: Broadcaster) {}

  ionViewCanEnter() {
    return this.authService.isAuthenticated();
  }

  ionViewDidEnter() {
    this.scrollToBottom();
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

  getMessageClass(message: Message):string {
    if (this.authService.isAuthenticated() && (message.userId == this.authService.currentUser.uid)) {
      return("pull-right");
    }else {
      return("pull-left");
    }
  }

  private getMessages() {
      this.messageProvider.getMessages(this.chat.id)
        .subscribe((messages: Message[]) => {
          this.messages = messages;
          this.finishLoadingMessages = true;
        });
  }

  private listenToBroadcaster() {
    this.messagesBroadcaster.on('CreateMessage').subscribe(
      (message: Message) => {
        this.messages.push(message);
        this.scrollToBottom();
      }
    );
  }

  private scrollToBottom() {
    if (this.content._scroll) this.content.scrollToBottom(0);
  }
}
