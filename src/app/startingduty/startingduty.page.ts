import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController, ToastController} from '@ionic/angular';
import {
  CalendarModal,
  CalendarResult
} from 'ion2-calendar';
import {CalendarComponentOptions} from 'ion2-calendar';

import {DatePicker} from '@ionic-native/date-picker/ngx';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TripService} from '../services/trip.service';
import {LoadingService} from '../services/loading.service';
import * as moment from 'moment';
import { Network } from '@capacitor/network';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-startingduty',
  templateUrl: './startingduty.page.html',
  styleUrls: ['./startingduty.page.scss'],
})
export class StartingdutyPage implements OnInit {
  plusTwo: string;
  date: string;
  form: FormGroup;
  showForm = false;
  minusTwo: string;
  errorMsg: any = '';
  selectedTime: any;
  isActive: boolean = false;
  isBtnActive: boolean = true;
  currentTime: string;
  minDate: any;
  networkStatus: boolean;

  constructor(public router: Router,
              private modalController: ModalController,
              private datePicker: DatePicker,
              private datePipe: DatePipe,
              private fb: FormBuilder,
              private tripService: TripService,
              private toastController: ToastController,
              private loadingService: LoadingService) {
  }

  async ngOnInit() {
    const status = await Network.getStatus();
    this.networkStatus = status.connected;
    Network.addListener('networkStatusChange', status => {
      this.networkStatus = status.connected;
      // console.log('vvvv',  this.networkStatus);
      if(this.networkStatus == true){
        let postData = JSON.parse(localStorage.getItem('formData'));
        if(postData != ''){
          this.tripService.postDuty(postData).subscribe(data => {
            //  console.log(data);
             this.router.navigateByUrl('onduty');
             localStorage.removeItem('formData');
          });
        }
      }
    });
    await this.fetchData();
  }

  async fetchData(){
    this.loadingService.startLoading();
    this.tripService.currentState().subscribe(data => {
      console.log(data);
      if (data.status === 'Running') {
        this.router.navigateByUrl('onduty');
      } else if (data.status === 'Sleeping') {
        this.router.navigateByUrl('sleepmode');
      } else if (data.status === 'Stopped') {
        this.router.navigateByUrl('resumedutyhour');
      } else {
        this.showForm = true;
        this.loadingService.stopLoading();
      }
    }, error => {
      this.showForm = true;
      this.loadingService.stopLoading();
    });

    this.getTimenow();

    const tabBar = document.getElementById('myTabBar');
    tabBar.style.display = 'none';
    this.form = this.fb.group({
      start_date: [this.datePipe.transform(new Date(), 'dd-MM-yyyy')],
      start_time: [this.datePipe.transform(new Date(), 'HH:mm')]
    });
  }

  async refresh(e) {
    await this.fetchData();
    e.target.complete();
  }

  getTimenow(){
    let date: Date = new Date();
    let crTime = date.setHours(date.getHours());
    this.selectedTime = this.datePipe.transform(crTime, 'HH:mm');
    let nextDate = date.setHours(date.getHours());
    let prevdate = date.setHours(date.getHours() - 2);
    this.date = this.datePipe.transform(nextDate, 'dd/MM/yy');
    this.plusTwo = this.datePipe.transform(nextDate, 'HH:mm');
    this.minusTwo = this.datePipe.transform(prevdate, 'HH:mm');
  }


  ionViewDidLeave() {
    const tabBar = document.getElementById('myTabBar');
    tabBar.style.display = 'flex';
  }

  async pageRoute(urlSlug: string) {
    if (this.form.valid && this.networkStatus == true) {
      this.tripService.postDuty(this.form.value).subscribe(data => {
        this.router.navigateByUrl('onduty');
      }, async error => {
        // console.log(error);
        const toast = await this.toastController.create({
          message: 'Something went wrong. Try again.',
          duration: 2000
        });
        await toast.present();
      });
    }else{
      localStorage.setItem('formData', JSON.stringify(this.form.value));
      Swal.fire({
        title: "Woah!",
        text: "Trip has been Started",
        icon: "success"
      });
      this.router.navigate(["/tabs/dashboard"], {
        replaceUrl: true
      });
      // this.router.navigateByUrl('onduty');
    }
  }

  async calendarModal() {
    const options: CalendarComponentOptions = {
      pickMode: 'single',
      showMonthPicker: true,
      showToggleButtons: true,
      monthPickerFormat: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    };

    const calendarUi = await this.modalController.create({
      component: CalendarModal,
      componentProps: {options}
    });

    calendarUi.present();
    const event: any = await calendarUi.onDidDismiss();
    const date: CalendarResult = event.data;
    this.date = this.datePipe.transform(date.string, 'dd/MM/yy');
    this.form.get('start_date').setValue(this.datePipe.transform(date.string, 'dd-MM-yyyy'));
  }


  showTimepicker() {
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      is24Hour: true,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
      okText: 'Save Time',
      nowText: 'Set Now'
    }).then(
      time => {
        let hour = time.getHours();
        let min = time.getMinutes();
        let formatMinute = min > 9 ? min : '0' + min;
        let forMatHour = hour > 9 ? hour : '0' + hour;
        this.selectedTime = forMatHour+':'+formatMinute;
        this.isTimeBetween(this.plusTwo, this.minusTwo, this.selectedTime);
      },
      err => console.log('Error occurred while getting time: ', err)
    );
  }

  isTimeBetween(plTwo: any, miTwo: any, selectedT: any) {
      let plussTwo = moment(plTwo, [moment.ISO_8601, 'HH:mm']);
      let minTwo = moment(miTwo, [moment.ISO_8601, 'HH:mm']);
      let seletTime = moment(selectedT, [moment.ISO_8601, 'HH:mm']);
      // let curTime = moment(currTime, [moment.ISO_8601, 'HH:mm']);
      // return curTime>= start && curTime< end
      // console.log('time----------',seletTime,minTwo,plussTwo);
      if( seletTime >=  minTwo && plussTwo >= seletTime ){
        this.isBtnActive = true;
        this.errorMsg = '';
        this.form.get('start_time').setValue(this.selectedTime);
      }else{
        this.isBtnActive = false;
        this.errorMsg = "Start time should be range between 2hrs before current time.";
      }
  }

}
