import { Component } from '@angular/core';
import { SignUpPage } from "../sign-up/sign-up";
import { UserService } from "../../providers/user.service";

import { User } from "../../models/user.model";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  signUpPage = SignUpPage;
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
