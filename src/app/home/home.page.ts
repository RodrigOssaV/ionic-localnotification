import { Component } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  template = {
    message: '',
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
          body: this.template.message,
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
    }).then(result => {
      console.log('this is result: ', result);
    })
      .then(data => {
        console.log('this is data: ', data)
        this.template.hour = 0;
        this.template.message = '';
        this.template.minutes = 0;
      })
      .catch(e => {
        console.log('oh no! this is an error! ', e);
      })
  }

}
