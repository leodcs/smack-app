import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthService } from "../../providers/auth.service";
import { UserService } from "../../providers/user.service";

/**
 * Generated class for the HomePage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  chatsRoot = 'ChatsPage';
  usersRoot = 'UsersPage';

  constructor(public navCtrl: NavController, private authService: AuthService) {}

  ionViewCanEnter() {
    // return this.authService.isAuthenticated();
    return true;
  }

}
