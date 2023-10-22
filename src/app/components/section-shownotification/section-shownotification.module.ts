import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionShownotificationComponent } from './section-shownotification.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SectionShownotificationComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SectionShownotificationComponent]
})
export class SectionShownotificationModule { }
