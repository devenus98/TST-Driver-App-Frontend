import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../services/leave.service';
import { ToastController } from '@ionic/angular';
import { DatePipe, formatDate } from '@angular/common';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-applyforleave',
  templateUrl: './applyforleave.page.html',
  styleUrls: ['./applyforleave.page.scss'],
})
export class ApplyforleavePage implements OnInit {
  public form: FormGroup;
  public shouldDisable = false;

  special_leave: boolean = false;
  leaveType: any[] = [
    { value: 'Urlaub', label: "LEAVE_REQUEST.URLAUB" },
    { value: 'Sonderurlaub', label: "LEAVE_REQUEST.SONDERURLAUB" },
    { value: 'Krank', label: "LEAVE_REQUEST.KRANK" },
  ]

  specialLeaveRegions: any[] = [
    { value: 'CHILD_MARRIAGE', label: 'LEAVE_REQUEST.CHILD_MARRIAGE' },
    { value: 'MOVIING_WITHIN_PLACE', label: 'LEAVE_REQUEST.MOVIING_WITHIN_PLACE' },
    { value: 'EXAMINATION_IN_TRAINING_OCCUPATION', label: 'LEAVE_REQUEST.EXAMINATION_IN_TRAINING_OCCUPATION' },
    { value: 'SPOUSE_DEATH', label: 'LEAVE_REQUEST.SPOUSE_DEATH' },
    { value: 'CHILD_DEATH', label: 'LEAVE_REQUEST.CHILD_DEATH' },
    { value: 'PARENT_DEATH', label: 'LEAVE_REQUEST.PARENT_DEATH' },
    { value: 'PARENT_INLAW_DEATH', label: 'LEAVE_REQUEST.PARENT_INLAW_DEATH' },
    { value: 'OWN_MARRIAGE', label: 'LEAVE_REQUEST.OWN_MARRIAGE' },
    { value: 'CHILD_BIRTH', label: 'LEAVE_REQUEST.CHILD_BIRTH' },
    { value: 'MOVING_OUT_OF_TOWN', label: 'LEAVE_REQUEST.MOVING_OUT_OF_TOWN' },
  ]

  constructor(public router: Router,
    private fb: FormBuilder,
    private leaveService: LeaveService,
    public toastController: ToastController,
    private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      leave_type: ['', Validators.required],
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
      message: ['', Validators.required],
      special_leave_reason: [''],
    });
  }

  async submitLeave() {
    if (this.form.valid) {
      this.shouldDisable = true;
      this.form.disable();
      const pipe = new DatePipe('en-US');
      const from_date = formatDate(this.form.value.from_date, 'dd-MM-yyyy', 'en-US');
      const to_date = formatDate(this.form.value.to_date, 'dd-MM-yyyy', 'en-US');
      this.form.value.from_date = from_date;
      this.form.value.to_date = to_date;
      await this.loadingService.startLoading();
      this.leaveService.postLeave(this.form.value).subscribe(async response => {
        const toast = await this.toastController.create({
          message: 'Urlaubsantrag wurde eingereicht',
          duration: 2000,
          position: 'middle'
        });
        this.loadingService.stopLoading();
        await toast.present();
        this.form.enable();
        this.shouldDisable = false;
        this.form.reset();
      }, async err => {
        this.loadingService.stopLoading();
        const toast = await this.toastController.create({
          message: 'Irgendwas ist schiefgelaufen, bitte melden Sie sich beim Support',
          duration: 2000,
          position: 'middle'
        });
        await toast.present();
        this.shouldDisable = false;
        this.form.enable();
      });
    } else {
      const toast = await this.toastController.create({
        message: 'Falsche Dateneingabe/Format',
        duration: 2000
      });
      await toast.present();
    }
  }


  leaveTypeData(event: any) {
    if (event.target.value == "Sonderurlaub") {
      this.special_leave = true;
      this.form.controls['special_leave_reason'].setValidators([Validators.required]);
      this.form.controls['special_leave_reason'].updateValueAndValidity();
    } else {
      this.special_leave = false;
      this.form.controls['special_leave_reason'].setValidators(null);
      this.form.controls['special_leave_reason'].updateValueAndValidity();
      this.form.controls['special_leave_reason'].setValue('');
    }
  }
}
