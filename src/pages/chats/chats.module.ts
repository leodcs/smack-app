import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatsPage } from './chats';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    ChatsPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ChatsPage)
  ],
})
export class ChatsPageModule {}
