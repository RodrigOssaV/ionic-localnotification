import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionNotificationComponent } from './section-notification.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SectionNotificationComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [SectionNotificationComponent]
})
export class SectionNotificationModule { }
