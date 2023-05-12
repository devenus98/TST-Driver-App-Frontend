import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TripService} from '../services/trip.service';
import {ToastController} from '@ionic/angular';
import {DatePipe} from '@angular/common';
import {LoadingService} from '../services/loading.service';

@Component({
  selector: 'app-sleepmode',
  templateUrl: './sleepmode.page.html',
  styleUrls: ['./sleepmode.page.scss'],
})
export class SleepmodePage implements OnInit {
  sleepData: any;
  now = new Date();
  time = new Date();

  constructor(public router: Router,
              private tripService: TripService,
              private loadingService: LoadingService,
              private toastController: ToastController,
              private datePipe: DatePipe) {
  }

  async ngOnInit() {
    await this.loadingService.startLoading();
    this.tripService.currentState().subscribe(data => {
      this.sleepData = data;
      if (data.status === 'Running') {
        this.router.navigateByUrl('onduty');
      } else if (data.status === 'Stopped') {
        this.router.navigateByUrl('resumedutyhour');
      }
      this.loadingService.stopLoading();
    }, async error => {
      const toast = await this.toastController.create({
        message: error.error.error,
        duration: 2000
      });
      await this.router.navigateByUrl('/tabs/dashboard');
      await toast.present();
      this.loadingService.stopLoading();
    });

    setInterval(() => {
      this.time=new Date();
    }, 1000);
  }

  PageRoute(urlSlug: string) {
    const date = this.datePipe.transform(new Date(), 'dd-MM-yyyy').toString();
    const time = this.datePipe.transform(new Date(), 'HH:mm');
    this.tripService.resumeDriving({sleep_end: time, sleep_end_date: date}).subscribe(data => {
      this.router.navigateByUrl('onduty');
    });
  }
}
