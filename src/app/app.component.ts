import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SignInPage } from "../pages/sign-in/sign-in";
import { AuthService } from "../providers/auth.service";
import { NativeStorage } from "@ionic-native/native-storage";
import { HomePage } from "../pages/home/home";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  userAccount: {
    email:string
    password:string
  };

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private authService: AuthService,
              private nativeStorage: NativeStorage) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.checkUser();
    });
  }

  private checkUser() {
    this.getCurrentUser()
      .then(
        user => this.authService.signIn(user.email, user.password)
                              .then(()=> this.rootPage = HomePage ),
        () => this.rootPage = SignInPage
      );
  }

  private getCurrentUser() {
    return this.nativeStorage.getItem('userAccount');
  }
}
