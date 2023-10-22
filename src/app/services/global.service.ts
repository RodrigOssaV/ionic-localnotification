import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';

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

  disabledButttonShow: boolean = false;

  darkMode: boolean = false;

  dataShowNotification: any[] = [];
  isThereDataToShow: boolean = false;

  constructor(private alertController: AlertController) { }

  async handleTimeNotification(data: any, time: any){
    console.log(data);
    await this.handleNotification(data);
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

  async checkPermissionsNotification(){
    await LocalNotifications.checkPermissions()
      .then(result => {
        return result
      })
      .then(async data => {
        console.log(data);
        let display = data.display;
        console.log('this is display value: ', display);

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
        console.log('this is data ', data);
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
      this.cleanTemplate();
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

  async handleNotification(data: any){
    console.log('this is notification ', data);
    this.dataShowNotification.push(data);
    this.isThereDataToShow = true;
    console.log(this.dataShowNotification);
  }
}
