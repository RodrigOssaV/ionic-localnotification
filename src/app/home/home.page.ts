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
    hour: new Date().getHours().toString(),
    minutes: new Date().getMinutes().toString()
  }

  isAvaibleHour: boolean = false;
  isAvaibleMinutes: boolean = false;
  isAvaibleInputHour: boolean = false;
  isAvaibleInputMinutes: boolean = false;

  constructor() {}

    // witch FIXME is a Sprint from Scrum and a version for the app

    // FIXME validate time rigth now ; setting time with 1000 seconds.
    // CHECK validate time past now.
    // FIXME change the name app.
    // FIXME change the icon app.
    // FIXME change colors app.
    // FIXME setting splashScreen with Lottie (?).
    // CHECK validate input numer, starting with 0 ; it's annoying.
    // FIXME make the APK.
    // FIXME make the readme file in github.
    // FIXME message for user for agree with the notifications on his cellphone, because if we don't do it the application not working.
    // FIXME setting dark theme with Capacitor Preferences.
    // FIXME add information about application (version, creator).
    // FIXME if the notifications were not accepted by the user, send error to the client.
    // FIXME Can we agroup this notification? if we can... implement with a list frontend.
    // FIXME if i can implement the list, the notifications that were displayed in time, implement a notice to the user.
    // FIXME button for RETRY this same notification for the other day (?).

  async testLocalNotifications(){
    console.log('this is template: ', this.template);
    await this.handleTimeNotification(this.template);
    // const notificationTime = new Date();
    // notificationTime.setHours(this.template.hour);
    // notificationTime.setMinutes(this.template.minutes);
    // notificationTime.setSeconds(0);
    // console.log(notificationTime);
    // await LocalNotifications.schedule({
    //   notifications: [
    //     {
    //       title: 'Important information.',
    //       body: this.template.message,
    //       id: 1,//Math.floor(Math.random() * 10000) + 1,
    //       schedule: {
    //         at: notificationTime, // Display the notification after 1 second
    //         // on: {
    //         //   hour: 20,
    //         //   minute: 37
    //         // },
    //         // every: 'day'
    //       },
    //       // actionTypeId: '',
    //       // extra: null,
    //     },
    //   ],
    // }).then(result => {
    //   console.log('this is result: ', result);
    // })
    //   .then(data => {
    //     console.log('this is data: ', data)
        this.template.hour = new Date().getHours().toString();
        this.template.message = '';
        this.template.minutes = new Date().getMinutes().toString();
    //   })
    //   .catch(e => {
    //     console.log('oh no! this is an error! ', e);
    //   })
  }

  ionFocusHourOrMinutes(event: any, number: number){
    // function to validate inputs when the input has focus.
    // console.log({event: event.target.value, number});

    // console.log('init value isAvaibleInputMinutes: ', this.isAvaibleInputMinutes);

    switch(number){
      case 1:
        // case hour
        this.template.hour = '';
        this.isAvaibleInputHour = true;
        break;
      case 2:
        // case minutes
        this.template.minutes = '';
        this.isAvaibleInputMinutes = true;
        // console.log('onClick value isAvaibleInputMinutes: ', this.isAvaibleInputMinutes);
        break;
    }
  }

  ionBlurHourOrMinutes(event: any, number: number){
    // console.log('ionBlurHourOrMinutes');
    // function to validate inputs when the input loses focus.
    // console.log(this.isAvaibleHour)
    switch(number){
      case 1:
        // case hour
        if(!this.isAvaibleHour){
          this.template.hour = new Date().getHours().toString();
          this.isAvaibleHour = true;
        }
        if(this.isAvaibleInputHour){
          this.template.hour = new Date().getHours().toString();
        }
        break;
      case 2:
        if(!this.isAvaibleMinutes){
          this.template.minutes = new Date().getMinutes().toString();
          this.isAvaibleMinutes = true;
        }
        if(this.isAvaibleInputMinutes){
          this.template.minutes = new Date().getMinutes().toString();
        }
        break;
    }
  }

  ionInputHourOrMinutes(event: any, number: number){
    let input = event.detail.value;

    switch(number){
      case 1:
        // case hour
        let hour_to_compare = new Date().getHours();
        if(input >= hour_to_compare){
          // ex: 24:20
          this.isAvaibleHour = true;
          this.isAvaibleInputHour = false;
        }else{
          // ex: 17:20
          this.isAvaibleHour = false;
        }
        break;
      case 2:
        let minutes_to_compare = new Date().getMinutes();
        if(input >= minutes_to_compare){
          // ex: 24:20
          this.isAvaibleMinutes = true;
          this.isAvaibleInputMinutes = false;
        }else{
          // ex: 17:20
          this.isAvaibleMinutes = false;
        }
    }
  }

  async handleTimeNotification(data: any){
    console.log(data);
    console.log(!this.isAvaibleInputHour, !this.isAvaibleInputMinutes);
    let now_hour = new Date().getHours().toString();
    let now_minutes = new Date().getMinutes().toString();

    if((now_hour === data.hour) && (now_minutes === data.minutes)){
      console.log('show notification now');
    }else{
      console.log('show notification later');
    }
  }

}
