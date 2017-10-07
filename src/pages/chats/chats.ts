import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Chat } from "../../models/chat.model";
import { ChatPage } from "../chat/chat";
import { ChatProvider } from "../../providers/chat.provider";
import { AuthProvider } from "../../providers/auth.provider";
import { UserProvider } from "../../providers/user.provider";
import { User } from "../../models/user.model";

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  chats: Chat[] = [];
  users: User[] = [];
  chat: Chat;
  finishLoadingChats:boolean = false;

  constructor(private navCtrl: NavController,
              private chatProvider: ChatProvider,
              private authProvider: AuthProvider,
              private userProvider: UserProvider) {}

  ionViewCanEnter() {
    return this.authProvider.isAuthenticated();
  }

  ionViewWillEnter() {
    this.setChats();
  }

  onOpenChat(chat: Chat):void {
    this.navCtrl.push(ChatPage, {
      chat: chat
    });
  }

  onSearchInput(event: any):void {
    let searchTerm:string = event.target.value;
    if (searchTerm) {
      this.chats = this.chats.filter((chat: Chat) => {
        return(this.isMatchingStrings(chat.title, searchTerm));
      });
      this.setUsers(searchTerm);
    }else{
      this.users = [];
      this.setChats();
    }
  }

  onUserClick(user: User) {
    this.chatProvider.createChatWith(user)
      .subscribe((newChat: Chat) => {
        this.navCtrl.push(ChatPage, { chat: newChat });
      });
  }

  private setChats():void {
    this.chatProvider.getChats()
      .subscribe((chats: Chat[]) => {
        this.chats = chats;
        this.finishLoadingChats = true;
      })
  }

  private setUsers(name: string):void {
    this.users = [];
    this.userProvider.getUsers()
      .subscribe((users: User[]) => {
        users.filter((user: User) => {
          return(this.isMatchingStrings(user.name, name));
        }).forEach((user: User) => {
          this.chatProvider.findChatWith(user)
            .subscribe((existingChat) => {
              if (!existingChat) {
                this.users.push(user);
              }
            });
        });
      });
  }

  private isMatchingStrings(string1: string, string2: string) {
    return(string1.toLowerCase().indexOf(string2.toLowerCase()) > -1)
  }
}
