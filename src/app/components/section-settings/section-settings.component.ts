import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-section-settings',
  templateUrl: './section-settings.component.html',
  styleUrls: ['./section-settings.component.scss'],
})
export class SectionSettingsComponent  implements OnInit {

  constructor(public globalService: GlobalService) { }

  ngOnInit() {}

}
