import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {TripService} from '../services/trip.service';
import {DatePipe} from '@angular/common';
import {LoadingService} from '../services/loading.service';

@Component({
  selector: 'app-onduty',
  templateUrl: './onduty.page.html',
  styleUrls: ['./onduty.page.scss'],
})
export class OndutyPage implements OnInit {
  dutyData: any;

  constructor(public router: Router,
              public alertController: AlertController,
              private tripService: TripService,
              private loadingService: LoadingService,
              private toastController: ToastController,
              private datePipe: DatePipe) {
  }

  async ngOnInit() {
    await this.loadingService.startLoading();
    this.tripService.currentState().subscribe(data => {
      if (data.status === 'Sleeping') {
        this.router.navigateByUrl('sleepmode');
      } else if (data.status === 'Stopped') {
        this.router.navigateByUrl('resumedutyhour');
      }
      this.dutyData = data;
      this.loadingService.stopLoading();
    }, async error => {
      const toast = await this.toastController.create({
        message: error.error.error,
        duration: 2000
      });
      this.router.navigateByUrl('/tabs/dashboard');
      await toast.present();
      this.loadingService.stopLoading();
    });
  }

  PageRoute(urlSlug: string) {
    const date = this.datePipe.transform(new Date(), 'dd-MM-YYYY').toString();
    const time = this.datePipe.transform(new Date(), 'HH:mm');
    this.tripService.stopDuty({end_date: date, end_time: time, status: 'Stopped'}).subscribe(data => {
      this.router.navigateByUrl('resumedutyhour');
    });
  }

  async sleepmode() {
    const alert = await this.alertController.create({
      cssClass: 'sleepmode-alert',
      message: 'Schlafmodus \n' +
        'starten?',
      buttons: [
        {
          text: 'Nein',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ja',
          handler: () => {
            const date = this.datePipe.transform(new Date(), 'dd-MM-YYYY').toString();
            const time = this.datePipe.transform(new Date(), 'HH:mm');
            this.tripService.startSleep({sleep_start: time, sleep_start_date: date}).subscribe(data => {
              this.router.navigateByUrl('sleepmode');
            }, error => {
              console.log(error);
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
