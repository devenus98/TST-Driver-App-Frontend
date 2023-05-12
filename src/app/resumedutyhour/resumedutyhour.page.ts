import {Component, OnInit} from '@angular/core';

import {PopoverController, ToastController} from '@ionic/angular';
import {DutyComponent} from '../popovers/duty/duty.component';
import {TripService} from '../services/trip.service';
import {Router} from '@angular/router';
import {LoadingService} from '../services/loading.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-resumedutyhour',
  templateUrl: './resumedutyhour.page.html',
  styleUrls: ['./resumedutyhour.page.scss'],
})
export class ResumedutyhourPage implements OnInit {
  public overviewData: any;

  constructor(private popover: PopoverController,
              private router: Router,
              private tripService: TripService,
              private loadingService: LoadingService,
              public toastController: ToastController,
              private datePipe: DatePipe
              ) {
  }

  async ngOnInit() {
    await this.fetchData();
  }

  async CreatePopover() {
    const pop = await this.popover.create({
      component: DutyComponent,
      cssClass: 'duty-class',
      // event: ev,
      translucent: true,
    });
    return await pop.present();
  }

  submitTrip() {
    let ddd = this.datePipe.transform( this.overviewData.trip_start_date, 'dd-MM-YYYY').toString();
    console.log(ddd);
    const data = {
      duty_start_time: this.overviewData.trip_start_time,
      duty_end_time: this.overviewData.trip_end_time,
      start_date: this.datePipe.transform( this.overviewData.trip_start_date, 'dd-MM-YYYY').toString(),
      end_date: this.datePipe.transform( this.overviewData.trip_end_date, 'dd-MM-YYYY').toString(),
      sleep_hour: this.overviewData.total_sleep_hour,
      duty_hour: this.overviewData.total_duty_hour,
      sleep_start_time: this.overviewData.sleep_data.length > 0 ? this.overviewData.sleep_data[0].sleep_start : '00:00:00',
      sleep_end_time: this.overviewData.sleep_data.length > 0 ? this.overviewData.sleep_data[this.overviewData.sleep_data.length - 1].sleep_end : '00:00:00'
    };
    this.tripService.postTrip(data).subscribe(async res => {
      const toast = await this.toastController.create({
        message: 'Fahrt abgeschlossen',
        duration: 2000
      });
      await toast.present();
      this.router.navigateByUrl('/tabs/logbook');
    }, async error => {
      const toast = await this.toastController.create({
        message: 'Fehler, bitte erneut versuchen',
        duration: 2000
      });
      await toast.present();
    });
  }

  async fetchData(){
    await this.loadingService.startLoading();
    this.tripService.currentState().subscribe(data => {
      if (data.status === 'Sleeping') {
        this.router.navigateByUrl('sleepmode');
      } else if (data.status === 'Running') {
        this.router.navigateByUrl('onduty');
      }
      this.tripService.getOverView().subscribe(res => {
        this.overviewData = res;
        this.loadingService.stopLoading();
      });
    }, async error => {
      if (error.status === 404) {
        const toast = await this.toastController.create({
          message: error.error.error,
          duration: 2000
        });
        await toast.present();
      }
      this.router.navigateByUrl('/tabs/dashboard');
    });
  }
  async refresh(e) {
    await this.fetchData();
    e.target.complete();
  }
}
