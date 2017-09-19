import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { User } from "../../models/user.model";
import { UserService } from "../../providers/user.service";
import { ChatPage } from "../chat/chat";

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  users:User[];
  finishLoadingUsers:boolean = false;

  constructor(private userService: UserService,
              private navCtrl: NavController) {}

  ionViewWillEnter() {
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

  onChatCreate(user: User):void {
    this.navCtrl.push(ChatPage, {
      recipientUser: user
    });
  }
}
