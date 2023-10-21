import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionSettingsComponent } from './section-settings.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SectionSettingsComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SectionSettingsComponent]
})
export class SectionSettingsModule { }
