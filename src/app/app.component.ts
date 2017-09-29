import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SignInPage } from "../pages/sign-in/sign-in";
import { Ng2Cable } from "ng2-cable";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SignInPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private ng2Cable: Ng2Cable) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.ng2Cable.subscribe('http://localhost:3000/cable', 'ChatChannel');
    });
  }
}
