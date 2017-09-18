import { NgModule } from '@angular/core';
import { CustomLoggedHeaderComponent } from './custom-logged-header/custom-logged-header';
import { IonicModule } from "ionic-angular";
import { CommonModule } from "@angular/common";
@NgModule({
	declarations: [CustomLoggedHeaderComponent],
	imports: [
    IonicModule,
    CommonModule
  ],
	exports: [CustomLoggedHeaderComponent]
})
export class ComponentsModule {}
