import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, NavParams } from 'ionic-angular';
import { Message } from "../../models/message.model";
import { Chat } from "../../models/chat.model";
import { MessageProvider } from "../../providers/message.provider";
import { Broadcaster, Ng2Cable } from "ng2-cable";
import { apiBasePath } from "../../environment";
import { AuthProvider } from "../../providers/auth.provider";

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

  constructor(private authProvider: AuthProvider,
              private navParams: NavParams,
              private messageProvider: MessageProvider,
              private ng2Cable: Ng2Cable,
              private messagesBroadcaster: Broadcaster) {}

  ionViewCanEnter() {
    return this.authProvider.isAuthenticated();
  }

  ionViewDidLeave() {
    this.ng2Cable.unsubscribe();
  }

  ionViewDidEnter() {
    this.scrollToBottom();
  }

  ionViewDidLoad() {
    this.chat = this.navParams.get('chat');
    this.pageTitle = this.chat.title;
    this.getMessages();
    this.ng2Cable.subscribe(`${apiBasePath}/cable`, 'ChatChannel', {
      chat_id: this.chat.id
    });
    this.listenToBroadcaster();
  }

  sendMessage(newMessageText: string) {
    if (newMessageText) {
      this.messageProvider.create(newMessageText, this.authProvider.currentUser.uid, this.chat.id).subscribe();
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
