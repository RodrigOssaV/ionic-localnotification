import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LocalNotifications } from '@capacitor/local-notifications';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-section-notification',
  templateUrl: './section-notification.component.html',
  styleUrls: ['./section-notification.component.scss'],
})
export class SectionNotificationComponent  implements OnInit {


  constructor(public globalService: GlobalService) { }

  ngOnInit() {
    this.globalService.createFormController();
  }

  onSubmit(){
    // console.log(this.globalService.notification);
    let form_value = this.globalService.notification.value;
    // console.log(form_value);
    this.globalService.handleTimeNotification(form_value);
  }

}
