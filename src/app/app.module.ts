import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { SignUpPageModule } from "../pages/sign-up/sign-up.module";
import { SignInPageModule } from "../pages/sign-in/sign-in.module";
import { ChatPageModule } from "../pages/chat/chat.module";
import { UserProvider } from '../providers/user.provider';
import { HttpModule } from "@angular/http";
import { ChatProvider } from "../providers/chat.provider";
import { MessageProvider } from '../providers/message.provider';
import { Broadcaster, Ng2Cable } from "ng2-cable";
import { A2tUiModule, Angular2TokenService } from "angular2-token";
import { AuthProvider } from '../providers/auth.provider';
import { TokenService } from "../providers/token.service";
import { ChatsPageModule } from "../pages/chats/chats.module";

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
    SignUpPageModule,
    SignInPageModule,
    HttpModule,
    ChatPageModule,
    A2tUiModule,
    ChatsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ChatProvider,
    MessageProvider,
    Ng2Cable,
    Broadcaster,
    Angular2TokenService,
    AuthProvider,
    TokenService
  ]
})
export class AppModule {}
