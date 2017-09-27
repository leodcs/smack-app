import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { User } from "../../models/user.model";
import { Chat } from "../../models/chat.model";
import { UserProvider } from "../../providers/user.provider";
import { ChatPage } from "../chat/chat";
import { ChatProvider } from "../../providers/chat.provider";
import { AuthService } from "../../providers/auth.service";

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
              private authService: AuthService) {}

  ionViewCanEnter() {
    return this.authService.isAuthenticated();
  }

  ionViewWillLoad() {
    this.userProvider.getUsers()
      .subscribe((allUsers) => {
        this.users = allUsers.filter((user: User) => user.uid !== this.authService.currentUser.uid);
        this.finishLoadingUsers = true;
      })
  }

  onUserClick(recipientUser: User):void {
    this.chatProvider.findChat(this.authService.currentUser.uid, recipientUser.uid)
      .subscribe((existingChat) => {
        if (existingChat) {
          this.chat = existingChat;
          this.navCtrl.push(ChatPage, { chat: this.chat });
        }else{
          this.chatProvider.createChat(this.authService.currentUser.uid, recipientUser.uid)
            .subscribe((newChat: Chat) => {
              this.chat = newChat;
              this.navCtrl.push(ChatPage, { chat: this.chat });
            });
        }
      });
  }
}
