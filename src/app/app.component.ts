import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private globalService: GlobalService) {
    this.platform.ready().then(async () => {
      await this.globalService.checkPermissionsNotification();
    })
  }
}
