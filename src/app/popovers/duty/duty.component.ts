import { Component, OnInit } from '@angular/core';
import { PopoverController } from "@ionic/angular";
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-duty',
  templateUrl: './duty.component.html',
  styleUrls: ['./duty.component.scss'],
})
export class DutyComponent implements OnInit {
  startDate: String = new Date().toISOString();

  constructor(private popover: PopoverController) { }

  ngOnInit() {}

  ClosePopover() {
    this.popover.dismiss();
  }

  
  changeDate(event: any){
    const eventTarget = event;
    console.log(eventTarget);
  }

}
