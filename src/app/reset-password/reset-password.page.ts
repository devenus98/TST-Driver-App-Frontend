import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import {ToastController} from '@ionic/angular';
import {LoadingService} from '../services/loading.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    public toastController: ToastController,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]),
      password2: new FormControl(null, [Validators.required]),
    });
  }

  redirectPage(urlSlug: string) {
    this.router.navigateByUrl('/' + urlSlug);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls; 
  }

  async setNewPassword(){
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    let password = this.form.controls['password'].value;
    let confirm_pass = this.form.controls['password2'].value;

    if(password != confirm_pass){
      const toast = await this.toastController.create({
        message: 'Confirm password should be same as password',
        position: 'middle',
         duration: 2000
      });
      await toast.present();
      return;
    }

    let postData={
        "new_password": password,
        "re_new_password": confirm_pass
    };
    await this.loadingService.startLoading();
    this.userService.setNewPassword(postData).subscribe(async res => {
      this.loadingService.stopLoading();
      console.log(res);
      const toast = await this.toastController.create({
        message: 'Password reeset successfully',
        position: 'top',
        duration: 1000
      });
      await toast.present();
      localStorage.removeItem("access");
      this.redirectToLogin();
      this.submitted = false;
    }, async err => {
      this.loadingService.stopLoading();
      const toast = await this.toastController.create({
        message: 'Something went wrong',
        position: 'top',
        duration: 1000
      });
      await toast.present();
      this.submitted = false;
    });

  }
  redirectToLogin(){
    setTimeout(() => {  
      this.form.reset();
      this.router.navigateByUrl('/login');
    }, 2000);
  }

}
