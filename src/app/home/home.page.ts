import { Component } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public globalService: GlobalService) {}

    // witch FIXME is a Sprint from Scrum and a version for the app

    // CHECK validate time right now ; setting time with 1000 seconds. (20/10)
    // FIXME change the name app.
    // FIXME change the icon app.
    // FIXME change colors app.
    // FIXME setting splashScreen with Lottie (?).
    // FIXME make the APK.
    // FIXME make the readme file in github.
    // CHECK message for user for agree with the notifications on his cellphone, because if we don't do it the application not working. (21/10)
    // CHECK setting dark theme with Capacitor Preferences. (22/10)
    // FIXME add information about application (version, creator).
    // CHECK if the notifications were not accepted by the user, send error to the client. (21/10)
    // FIXME Can we agroup this notification? if we can... implement with a list frontend.
    // FIXME if i can implement the list, the notifications that were displayed in time, implement a notice to the user.
    // FIXME button for RETRY this same notification for the other day (?).
    // CHECK refresh application. (20/10)
    // CHECK button toggletheme dark-light. (22/10)
    // CHECK implement validate input numer, starting with 0 ; it's annoying. (19/10)
    // CHECK implement validate time past now. (19/10)
    // FIXME spoken messages
    // FIXME found a bug at moment to show the notification.

    async handleRefresh(event: any) {
      await this.globalService.refreshContent(event);
    }
}
