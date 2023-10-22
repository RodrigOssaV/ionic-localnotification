import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-section-shownotification',
  templateUrl: './section-shownotification.component.html',
  styleUrls: ['./section-shownotification.component.scss'],
})
export class SectionShownotificationComponent  implements OnInit {

  constructor(public globalService: GlobalService) { }

  ngOnInit() {
    // this.globalService.handleNotification();
  }

}
