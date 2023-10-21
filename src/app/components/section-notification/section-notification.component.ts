import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-section-notification',
  templateUrl: './section-notification.component.html',
  styleUrls: ['./section-notification.component.scss'],
})
export class SectionNotificationComponent  implements OnInit {

  // template = {
  //   message: '',
  //   hour: new Date().getHours().toString(),
  //   minutes: new Date().getMinutes().toString()
  // }

  isAvaibleHour: boolean = false;
  isAvaibleMinutes: boolean = false;
  isAvaibleInputHour: boolean = false;
  isAvaibleInputMinutes: boolean = false;

  constructor(public globalService: GlobalService) { }

  ngOnInit() {}


  async testLocalNotifications(){
    console.log('this is template: ', this.globalService.template);

    let number_hour = parseInt(this.globalService.template.hour);
    let number_minutes = parseInt(this.globalService.template.minutes);
    const notificationTime = new Date();
    notificationTime.setHours(number_hour);
    notificationTime.setMinutes(number_minutes);
    notificationTime.setSeconds(0);
    console.log(notificationTime);
    await this.globalService.handleTimeNotification(this.globalService.template, notificationTime);
    await this.globalService.cleanTemplate();
  }

  ionFocusHourOrMinutes(event: any, number: number){
    // function to validate inputs when the input has focus.
    // console.log({event: event.target.value, number});

    // console.log('init value isAvaibleInputMinutes: ', this.isAvaibleInputMinutes);

    switch(number){
      case 1:
        // case hour
        this.globalService.template.hour = '';
        this.isAvaibleInputHour = true;
        break;
      case 2:
        // case minutes
        this.globalService.template.minutes = '';
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
          this.globalService.template.hour = new Date().getHours().toString();
          this.isAvaibleHour = true;
        }
        if(this.isAvaibleInputHour){
          this.globalService.template.hour = new Date().getHours().toString();
        }
        break;
      case 2:
        if(!this.isAvaibleMinutes){
          this.globalService.template.minutes = new Date().getMinutes().toString();
          this.isAvaibleMinutes = true;
        }
        if(this.isAvaibleInputMinutes){
          this.globalService.template.minutes = new Date().getMinutes().toString();
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



}
