import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  notification: any; // var for formGroup
  disabledButttonShow: boolean = false; // disabled btn if agreed with notifications
  darkMode: boolean = false; // var theme dark-ligth mode
  dataShowNotification: any[] = []; // array to save all notifications
  isThereDataToShow: boolean = false; // var for section show-notifications. false=not show ; true=show

  constructor(private alertController: AlertController) { }

  async handleTimeNotification(data: any){
    // console.log(data);
    // await this.handleNotification(data);
    // // console.log(!this.isAvaibleInputHour, !this.isAvaibleInputMinutes);
    let now_hour = new Date().getHours();
    let now_minutes = new Date().getMinutes();

    // console.log({hour: {data: data.hour, now_hour}, minues: {data: data.minutes, now_minutes}});

    if((now_hour === data.hour) && (now_minutes === data.minutes)){
      // console.log('show notification now');
      await this.showNotificationRighNow(data.message);
    }else{
      // console.log('show notification later');
      await this.showNotificationLater(this.settingDataToDate(data), data.message);
    }
  }

  async handleNotification(isRemaining: boolean, id: number){
    // console.log('this is notification ', this.notification.value);
    let data_value = this.notification.value;

    const time_remaining = this.settingTimeRemaining(data_value, 1);
    // console.log('time_remaining: ', time_remaining[0]);
    let data_to_show = {
      id_message: id,
      message: data_value.message,
      message_hour: data_value.hour,
      message_minutes: data_value.minutes,
      message_hour_remaining: this.settingZeros(time_remaining[0].hour_remaining_one),
      message_minutes_remaining: this.settingZeros(time_remaining[0].minutes_remaining_one),
      message_remaining: isRemaining,
      color_card_item: (isRemaining) ? 'tertiary' : time_remaining[0].color_card_item
    }
    // console.log('this is final notification to show: ', data_to_show);
    this.dataShowNotification.push(data_to_show);
    this.isThereDataToShow = true;
    // console.log(this.dataShowNotification);
    this.notification.reset();
  }

  settingTimeRemaining(data: any, method: number){

    var response = [];

    switch(method){
      case 1:
        // console.log('notification rigth now');
        let current_hour_one = new Date().getHours();
        let current_minutes_one = new Date(). getMinutes();
        let hour_remaining_one = data.hour - current_hour_one;
        let minutes_remaining_one = data.minutes - current_minutes_one;
        let color_card_item = 'medium';
        // console.log({hour_remaining, minutes_remaining});
        response.push({hour_remaining_one, minutes_remaining_one, color_card_item});
        break;
      case 2:
        // console.log('notification later');
        // console.log(data) dataShowNotification
        data.map((item: any) => {
          // console.log(item);
          let current_hour_two = new Date().getHours();
          let current_minutes_two = new Date(). getMinutes();
          let hour_remaining_two = item.message_hour - current_hour_two;
          let minutes_remaining_two = item.message_minutes - current_minutes_two;
          // console.log({hour_remaining_two, minutes_remaining_two});

          if(minutes_remaining_two <= 0 && !item.message_remaining){
            item.message_hour_remaining = '00';
            item.message_minutes_remaining = '00';
            item.message_remaining = true;
            item.color_card_item = 'tertiary'
          }
        })
        break;
    }

    return response
  }

  async showNotificationRighNow(message: any){
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Important information.',
          body: message,
          id: Math.floor(Math.random() * 10000) + 1,
          schedule: {
            at: new Date(Date.now() + 1000), // Display the notification after 1 second
          },
        },
      ],
    }).then(result => {
      // console.log('this is result: ', result);
      return result
    })
      .then(async (data: any) => {
        // console.log('this is data: ', data.notifications[0].id);
        let id = data.notifications[0].id;
        this.handleNotification(true, id);
    })
    .catch(e => {
      console.log('oh no! this is an error! ', e);
    })
  }

  async showNotificationLater(data: any, message: any){
    // console.log(data, message);
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Important information.',
          body: message,
          id: Math.floor(Math.random() * 10000) + 1,
          schedule: {
            at: data,
          },
        },
      ],
    }).then(result => {
      // console.log('this is result: ', result);
      return result
    })
      .then(async (data: any) => {
        // console.log('this is data: ', data.notifications[0].id);
        let id = data.notifications[0].id;
        this.handleNotification(false, id);
    })
    .catch(e => {
      // console.log('oh no! this is an error! ', e);
    })
  }

  async checkPermissionsNotification(){
    await LocalNotifications.checkPermissions()
      .then(result => {
        return result
      })
      .then(async data => {
        // console.log(data);
        let display = data.display;
        // console.log('this is display value: ', display);

        (display === 'granted') ? console.log('can show notification') : await this.handleAlertPermissionNotification();
      })
      .catch(e => console.log(e))
  }

  async requestPermissionsNotification(){
    await LocalNotifications.requestPermissions()
      .then(result => {
        return result
      })
      .then(data => {
        // console.log('this is data ', data);
        this.disabledButttonShow = false;
      })
      .catch(err => console.log(err))
  }

  async handleAlertPermissionNotification(){
    await this.alertController.create({
      header: 'Notification permission',
      subHeader: 'To use this application you must have the option to accept notifications.',
      message: 'Do you agree to accept notifications from this application on your cell phone?',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: async () => {
            await this.requestPermissionsNotification();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: async (alert) => {
            this.disabledButttonShow = true;
          }
        }
      ]

    }).then(async alert => await alert.present());
  }

  async refreshContent(event: any){
    setTimeout(async () => {
      this.settingTimeRemaining(this.dataShowNotification, 2);
      this.notification.reset();
      await this.checkPermissionsNotification();
      event.target.complete();
    }, 2000);
  }

  toggleDarkMode(){
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    if(this.darkMode){
      Preferences.set({key: 'darkModeActivated', value: 'true'});
    }else{
      Preferences.set({key: 'darkModeActivated', value: 'false'});
    }
  }

  async checkAppModeTheme(){
    const checkIsDarkMode = await Preferences.get({key: 'darkModeActivated'});
    checkIsDarkMode.value == 'true' ? (this.darkMode = true) : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }

  createFormController(){
    this.notification = new FormGroup({
      message: new FormControl('', Validators.required),
      hour: new FormControl('', Validators.required),
      minutes: new FormControl('', Validators.required)
    })
  }

  settingDataToDate(data: any){
    const setting_hour = new Date();
    setting_hour.setHours(data.hour);
    setting_hour.setMinutes(data.minutes);
    setting_hour.setSeconds(0);
    return setting_hour
  }

  settingZeros(number: number){
    console.log(number);
    if(number < 10){
      return '0' + number;
    }
    return number
  }
}
