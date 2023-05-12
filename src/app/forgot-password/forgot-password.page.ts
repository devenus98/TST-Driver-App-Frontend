import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import {ToastController} from '@ionic/angular';
import {LoadingService} from '../services/loading.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form: FormGroup;
  submitted: boolean = false;
  resMsg: any;
  otpVerify: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    public toastController: ToastController,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async onOtpChange(event: any){
    if(event.length == 6){
      let postData = {
        "otp": event
      }
      await this.loadingService.startLoading();
      this.userService.verifyOtp(postData).subscribe(async res => {
        this.loadingService.stopLoading();
        this.router.navigateByUrl('/reset-password');
      },async err => {
        this.resMsg = err.error.detail;
        this.loadingService.stopLoading();
      });
    }
  }

  redirectPage(urlSlug: string) {
      this.router.navigateByUrl('/' + urlSlug);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls; 
  }

  async forgotPassword(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    let postData={
      "email":this.form.controls['email'].value,
    };
    await this.loadingService.startLoading();
    this.userService.resetPassword(postData).subscribe(async res => {
      this.loadingService.stopLoading();
      if(res.token || res != ''){
        localStorage.setItem('access', res.token);
        const toast = await this.toastController.create({
          message: 'A verification code sent on your email address',
          position: 'top',
          duration: 3000
        });
        await toast.present();
        this.otpVerify = true;
      }
      this.submitted = false;
    }, err => {
      this.loadingService.stopLoading();
      this.submitted = false;
    });


  }

}
