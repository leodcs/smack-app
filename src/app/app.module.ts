import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AngularFireModule } from "angularfire2";
import { firebaseConfig } from "../environment";
import { SignUpPageModule } from "../pages/sign-up/sign-up.module";
import { UserService } from "../providers/user.service";
import { AngularFireDatabase } from "angularfire2/database";
import { AuthService } from "../providers/auth.service";
import { AngularFireAuth } from "angularfire2/auth";
import { SignInPageModule } from "../pages/sign-in/sign-in.module";
import { HomePageModule } from "../pages/home/home.module";
import { ChatPageModule } from "../pages/chat/chat.module";
import { ChatService } from '../providers/chat.service';
import { MessageService } from "../providers/message.service";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Voltar',
      platforms: {
        android: {
          tabsPlacement: 'top'
        }
      }
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    HomePageModule,
    SignUpPageModule,
    SignInPageModule,
    ChatPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    AngularFireDatabase,
    AuthService,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ChatService,
    MessageService
  ]
})
export class AppModule {}
