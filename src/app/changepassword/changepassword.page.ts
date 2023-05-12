import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {LoadingService} from '../services/loading.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  public form: FormGroup;
  public shouldDisable = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              public toastController: ToastController,
              private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      current_password: ['', Validators.required],
      new_password: ['', Validators.required],
      confirm_new_password: ['', Validators.required]
    });
  }

  async submitPasswordChangeForm() {
    if (this.form.valid) {
      this.form.disable();
      this.shouldDisable = true;
      await this.loadingService.startLoading();
      this.userService.changePassword(this.form.value).subscribe(async data => {
        const toast = await this.toastController.create({
          message: 'Password changed successfully',
          duration: 2000
        });
        this.loadingService.stopLoading();
        await toast.present();
        this.form.enable();
        this.form.reset();
        this.shouldDisable = false;
        localStorage.removeItem('access');
        this.router.navigateByUrl('/login');
      }, async error => {
        const toast = await this.toastController.create({
          message: error.error.error ? error.error.error : error.error.new_password,
          duration: 2000
        });
        this.loadingService.stopLoading();
        await toast.present();
        this.form.enable();
        this.shouldDisable = false;
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
