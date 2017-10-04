import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth.provider";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  chatsRoot = 'ChatsPage';
  usersRoot = 'UsersPage';

  constructor(private authProvider: AuthProvider) {}

  ionViewCanEnter() {
    return this.authProvider.isAuthenticated();
  }

}
