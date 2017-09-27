import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AuthService } from "../../providers/auth.service";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  chatsRoot = 'ChatsPage';
  usersRoot = 'UsersPage';

  constructor(private authService: AuthService) {}

  ionViewCanEnter() {
    return this.authService.isAuthenticated();
  }

}
