import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AngularFireModule } from "angularfire2";
import { firebaseConfig } from "../environment";
import { SignUpPageModule } from "../pages/sign-up/sign-up.module";
import { AuthService } from "../providers/auth.service";
import { AngularFireAuth } from "angularfire2/auth";
import { SignInPageModule } from "../pages/sign-in/sign-in.module";
import { HomePageModule } from "../pages/home/home.module";
import { ChatPageModule } from "../pages/chat/chat.module";
import { UserProvider } from '../providers/user.provider';
import { HttpModule } from "@angular/http";
import { ChatProvider } from "../providers/chat.provider";
import { MessageProvider } from '../providers/message.provider';
import { Broadcaster, Ng2Cable } from "ng2-cable";
import { NativeStorage } from "@ionic-native/native-storage";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      platforms: {
        ios: {
          backButtonText: 'Voltar'
        }
      }
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    HomePageModule,
    SignUpPageModule,
    SignInPageModule,
    HttpModule,
    ChatPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthService,
    UserProvider,
    ChatProvider,
    MessageProvider,
    Ng2Cable,
    Broadcaster,
    NativeStorage
  ]
})
export class AppModule {}
