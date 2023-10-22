import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SectionSettingsModule } from '../components/section-settings/section-settings.module';
import { SectionNotificationModule } from '../components/section-notification/section-notification.module';
import { SectionFooterModule } from '../components/section-footer/section-footer.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomePageRoutingModule,
    SectionSettingsModule,
    SectionNotificationModule,
    SectionFooterModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
