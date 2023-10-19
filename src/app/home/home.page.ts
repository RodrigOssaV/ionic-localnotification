import { Component } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  template = {
    hour: 0,
    minutes: 0
  }

  constructor() {}

  async testLocalNotifications(){
    console.log('this is template: ', this.template);
    const notificationTime = new Date();
    notificationTime.setHours(this.template.hour);
    notificationTime.setMinutes(this.template.minutes);
    notificationTime.setSeconds(0);
    console.log(notificationTime);
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Important information.',
          body: 'Remembering close the user session. Thanks!',
          id: 1,//Math.floor(Math.random() * 10000) + 1,
          schedule: {
            at: notificationTime, // Display the notification after 1 second
            // on: {
            //   hour: 20,
            //   minute: 37
            // },
            // every: 'day'
          },
          // actionTypeId: '',
          // extra: null,
        },
      ],
    })
  }

}
