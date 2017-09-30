import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Chat } from "../../models/chat.model";
import { ChatPage } from "../chat/chat";
import { ChatProvider } from "../../providers/chat.provider";
import { Broadcaster, Ng2Cable } from "ng2-cable";
import { AuthService } from "../../providers/auth.service";
import { apiHostUrl } from "../../environment";
import { Message } from "../../models/message.model";

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  chats: Chat[] = [];
  finishLoadingChats:boolean = false;

  constructor(private navCtrl: NavController,
              private chatProvider: ChatProvider,
              private authService: AuthService,
              private ng2Cable: Ng2Cable,
              private inboxBroadcaster: Broadcaster) {}

  ionViewCanEnter() {
    return this.authService.isAuthenticated();
  }

  ionViewWillEnter() {
    this.setChats();
  }

  ionViewWillUnload() {
    this.ng2Cable.unsubscribe();
  }

  onOpenChat(chat: Chat):void {
    this.navCtrl.push(ChatPage, {
      chat: chat
    });
  }

  private setChats():void {
    this.chatProvider.getChats()
      .subscribe((chats) => {
        this.chats = chats;
        this.listenToBroadcaster();
        this.finishLoadingChats = true;
      })
  }

  private listenToBroadcaster() {
    this.chats.forEach((chat) => {
      this.ng2Cable.subscribe( `${apiHostUrl}/cable`, 'ChatChannel', {
        chat_id: chat.id
      });
    });
    this.inboxBroadcaster.on('CreateMessage').subscribe(
      (message: Message) => {
        const chatIndex = this.chats.findIndex(chat => chat.id == message.chatId);
        this.chats[chatIndex].lastMessage = message.text;
      }
    );
  }
}
