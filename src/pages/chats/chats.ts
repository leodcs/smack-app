import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Chat } from "../../models/chat.model";
import { ChatPage } from "../chat/chat";
import { ChatProvider } from "../../providers/chat.provider";

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  chats: any = [];
  finishLoadingChats:boolean = false;

  constructor(private navCtrl: NavController,
              private chatProvider: ChatProvider) {}

  ionViewWillEnter() {
    this.setChats();
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
        this.finishLoadingChats = true;
      })
  }
}
