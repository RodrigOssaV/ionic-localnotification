import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  template = {
    message: '',
    hour: new Date().getHours().toString(),
    minutes: new Date().getMinutes().toString()
  }

  isAvaibleHour: boolean = false;
  isAvaibleMinutes: boolean = false;
  isAvaibleInputHour: boolean = false;
  isAvaibleInputMinutes: boolean = false;

  constructor() { }

  async handleTimeNotification(data: any, time: any){
    console.log(data);
    // console.log(!this.isAvaibleInputHour, !this.isAvaibleInputMinutes);
    let now_hour = new Date().getHours().toString();
    let now_minutes = new Date().getMinutes().toString();

    if((now_hour === data.hour) && (now_minutes === data.minutes)){
      // console.log('show notification now');
      await this.showNotificationRighNow();
    }else{
      // console.log('show notification later');
      await this.showNotificationLater(time);
    }
  }

  async showNotificationRighNow(){
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Important information.',
          body: this.template.message,
          id: 1,//Math.floor(Math.random() * 10000) + 1,
          schedule: {
            at: new Date(Date.now() + 1000), // Display the notification after 1 second
          },
        },
      ],
    }).then(result => {
      console.log('this is result: ', result);
    })
      .then(async data => {
        console.log('this is data: ', data);
        await this.cleanTemplate();
    })
    .catch(e => {
      console.log('oh no! this is an error! ', e);
    })
  }

  async showNotificationLater(time: any){
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Important information.',
          body: this.template.message,
          id: 1,//Math.floor(Math.random() * 10000) + 1,
          schedule: {
            at: time,
          },
        },
      ],
    }).then(result => {
      console.log('this is result: ', result);
    })
      .then(async data => {
        console.log('this is data: ', data)
        await this.cleanTemplate();
    })
    .catch(e => {
      console.log('oh no! this is an error! ', e);
    })
  }

  async cleanTemplate(){
    this.template.hour = new Date().getHours().toString();
    this.template.message = '';
    this.template.minutes = new Date().getMinutes().toString();
  }
}
