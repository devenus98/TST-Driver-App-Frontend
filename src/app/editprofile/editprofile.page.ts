import {Component, OnInit} from '@angular/core';
import {ActionSheetController, ToastController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {DatePipe} from '@angular/common';
import {LoadingService} from '../services/loading.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  formGroup: FormGroup;

  constructor(
    private userService: UserService,
    private actionSheetController: ActionSheetController,
    private fb: FormBuilder,
    private toastController: ToastController,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {

    this.buildForm();
    this.loadingService.startLoading();
    this.userService.profileDetail().subscribe(data => {
      this.formGroup.patchValue({
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        email: data.email,
        bio: data.bio,
        birth_date: data.birth_date ? data.birth_date : ''
      });
      this.loadingService.stopLoading();
    }, error => {
      this.loadingService.stopLoading();
    });

  }

  buildForm() {
    this.formGroup = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: ['', Validators.required],
      bio: ['', Validators.required],
      birth_date: ['', Validators.required]
    });
  }

  async submitUpdateProfileData() {
    if (this.formGroup.valid) {
      await this.loadingService.startLoading();
      const datePipe = new DatePipe('en-US');
      this.formGroup.value.birth_date = datePipe.transform(this.formGroup.value.birth_date, 'dd-MM-yyyy');
      this.userService.updateProfile(this.formGroup.value).subscribe(async res => {
        const toast = await this.toastController.create({
          message: 'Profile is saved',
          duration: 2000
        });
        await toast.present();
        this.loadingService.stopLoading();
      }, async error => {
        const toast = await this.toastController.create({
          message: 'Something went wrong. Try again please',
          duration: 2000
        });
        await toast.present();
        this.loadingService.stopLoading();
      });
    }
  }
}
