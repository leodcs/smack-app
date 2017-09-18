import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsersPage } from './users';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    UsersPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(UsersPage)
  ],
})
export class UsersPageModule {}
