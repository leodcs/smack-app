import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ChatService } from "../../providers/chat.service";
import { Chat } from "../../models/chat.model";
import { UserService } from "../../providers/user.service";
import { ChatPage } from "../chat/chat";

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  chats: Chat[] = [];
  finishLoadingChats:boolean = false;

  constructor(private chatService: ChatService,
              private navCtrl: NavController,
              private userService: UserService) {}

  ionViewWillEnter() {
    this.setChats();
  }

  onChatOpen(chat: Chat) {
    this.navCtrl.push(ChatPage, {
      recipient: this.userService.getUserById(chat.$key)
    });
  }

  private setChats():void {
    this.chatService.getChats()
      .subscribe(chats => {
        this.chats = [];
        chats.forEach((elem: Chat)=>{
          let newChat = new Chat(elem.lastMessage, elem.timestamp, elem.title, elem.photo);
          newChat.uid = elem.$key;
          this.chats.push(newChat);
        });
        this.finishLoadingChats = true;
      });
  }
}
