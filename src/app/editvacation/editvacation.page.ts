import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingController, ToastController} from '@ionic/angular';
import {LeaveService} from '../services/leave.service';
import {formatDate} from '@angular/common';
import {LoadingService} from '../services/loading.service';

@Component({
  selector: 'app-editvacation',
  templateUrl: './editvacation.page.html',
  styleUrls: ['./editvacation.page.scss'],
})
export class EditvacationPage implements OnInit {
  id: string;
  form: FormGroup;
  public shouldDisabled = false;

  constructor(public router: Router,
              private fb: FormBuilder,
              private activatedRouter: ActivatedRoute,
              public toastController: ToastController,
              public loadingService: LoadingService,
              private leaveService: LeaveService) {
  }

  async ngOnInit() {
    this.form = this.buildForm();
    this.shouldDisabled = true;
    await this.loadingService.startLoading();
    this.activatedRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.leaveService.retrieveLeave(this.id).subscribe(data => {
        this.loadingService.stopLoading();
        this.form.patchValue({
          leave_type: data.leave_type,
          from_date: data.from_date,
          to_date: data.to_date,
          message: data.message
        });
        this.shouldDisabled = false;
      },error => this.loadingService.stopLoading());
    });
  }

  buildForm(): any {
    return this.fb.group({
      leave_type: ['', Validators.required],
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  async submitUpdateVacationForm() {
    if (this.form.valid) {
      this.form.disable();
      this.shouldDisabled = true;
      await this.loadingService.startLoading();
      const from_date = formatDate(this.form.value.from_date, 'dd-MM-yyyy', 'en-US');
      const to_date = formatDate(this.form.value.to_date, 'dd-MM-yyyy', 'en-US');
      this.form.value.from_date = from_date;
      this.form.value.to_date = to_date;
      this.leaveService.updateLeave(this.id, this.form.value).subscribe(async data => {
        this.form.enable();
        this.shouldDisabled = false;
        this.loadingService.stopLoading();
        const toast = await this.toastController.create({
          message: 'Leave request is updated',
          duration: 2000
        });
        await toast.present();
      }, async error => {
        this.form.enable();
        this.shouldDisabled = false;
        const toast = await this.toastController.create({
          message: 'Something went wrong, try again',
          duration: 2000
        });
        await toast.present();
        this.loadingService.stopLoading();
      });
    } else {
      const toast = await this.toastController.create({
        message: 'invalid form',
        duration: 2000
      });
      await toast.present();
    }
  }
}
