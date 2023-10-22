import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionFooterComponent } from './section-footer.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SectionFooterComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SectionFooterComponent]
})
export class SectionFooterModule { }
