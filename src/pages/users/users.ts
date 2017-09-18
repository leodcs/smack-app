import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { User } from "../../models/user.model";
import { UserService } from "../../providers/user.service";

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  users:User[];
  finishLoadingUsers:boolean = false;

  constructor(private userService: UserService) {}

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
    console.log(user);
  }
}
