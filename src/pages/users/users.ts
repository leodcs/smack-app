import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { User } from "../../models/user.model";
import { UserService } from "../../providers/user.service";
import { ChatPage } from "../chat/chat";
import { ChatService } from "../../providers/chat.service";
import * as firebase from "firebase/app";
import { Chat } from "../../models/chat.model";

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  users:User[];
  finishLoadingUsers:boolean = false;

  constructor(private userService: UserService,
              private navCtrl: NavController,
              private chatService: ChatService) {}

  ionViewWillLoad() {
    this.userService.getUsers().subscribe(
      (fetchedUsers) => {
        this.finishLoadingUsers = true;
        this.users = fetchedUsers;
      },
      (error) => {
        console.warn(error);
      }
    );
  }

  onChatCreate(recipientUser: User):void {
    this.checkExistingChatOrCreate(recipientUser);
    this.navCtrl.push(ChatPage, {
      recipient: recipientUser
    });
  }

  private checkExistingChatOrCreate(recipientUser: User) {
    const currentUser = this.userService.currentUser;
    this.chatService.getDeepChat(currentUser.$key, recipientUser.$key)
      .subscribe((chat) => {
        if (chat.hasOwnProperty('$value')){
          const timestamp: Object = firebase.database.ServerValue.TIMESTAMP;

          const firstChat = new Chat('', timestamp, recipientUser.name, '');
          this.chatService.create(firstChat, currentUser.$key, recipientUser.$key);

          const secondChat = new Chat('', timestamp, currentUser.name, '');
          this.chatService.create(secondChat, recipientUser.$key, currentUser.$key);
        }
      });
  }

}
