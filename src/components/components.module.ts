import { NgModule } from '@angular/core';
import { CustomLoggedHeaderComponent } from './custom-logged-header/custom-logged-header.component';
import { IonicModule } from "ionic-angular";
import { CommonModule } from "@angular/common";
import { MessageBoxComponent } from './message-box/message-box.component';

@NgModule({
	declarations: [CustomLoggedHeaderComponent,
    MessageBoxComponent],
	imports: [
    IonicModule,
    CommonModule
  ],
	exports: [CustomLoggedHeaderComponent,
    MessageBoxComponent]
})
export class ComponentsModule {}
