import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { User } from "../../models/user.model";
import { Chat } from "../../models/chat.model";
import { UserProvider } from "../../providers/user.provider";
import { ChatPage } from "../chat/chat";
import { ChatProvider } from "../../providers/chat.provider";
import { AuthProvider } from "../../providers/auth.provider";

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  users: User[];
  finishLoadingUsers:boolean = false;
  chat:Chat;

  constructor(private navCtrl: NavController,
              private userProvider: UserProvider,
              private chatProvider: ChatProvider,
              private authProvider: AuthProvider) {}

  ionViewCanEnter() {
    return this.authProvider.isAuthenticated();
  }

  ionViewWillLoad() {
    this.userProvider.getUsers()
      .subscribe((users) => {
        this.users = users;
        this.finishLoadingUsers = true
      });
  }

  onUserClick(recipientUser: User):void {
    this.chatProvider.findChatWith(recipientUser)
      .subscribe((existingChat) => {
        if (existingChat) {
          this.chat = existingChat;
          this.navCtrl.push(ChatPage, { chat: this.chat });
        }else{
          this.chatProvider.createChatWith(recipientUser)
            .subscribe((newChat: Chat) => {
              this.chat = newChat;
              this.navCtrl.push(ChatPage, { chat: this.chat });
            });
        }
      });
  }
}
