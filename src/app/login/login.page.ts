import { Component, OnInit } from '@angular/core';
import { IonInput, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { LoadingService } from "../services/loading.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  type: any = 'password';
  form: FormGroup;
  public shouldDisabled = false;
  profileInfo: any;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    public toastController: ToastController,
    private loadingService: LoadingService) {
  }

  async ngOnInit() {
    this.checkLogin();
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }

  checkLogin() {
    if (localStorage.getItem('access') && localStorage.getItem('refresh')) {
      this.userService.isLoggedIn({ token: localStorage.getItem('access') }).subscribe(data => {
        this.router.navigateByUrl('/tabs/dashboard', { replaceUrl: true });
      });
    }
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
    this.type = this.showPassword ? 'text' : 'password';
  }

  async submitLoginForm() {
    if (this.form.valid) {
      this.form.disable();
      this.shouldDisabled = true;
      await this.loadingService.startLoading();
      this.userService.login(this.form.value).subscribe(data => {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        this.loadingService.stopLoading();
        this.getProfileData();
        this.form.reset();
        this.router.navigateByUrl('/tabs/dashboard');
      }, async error => {
        const toast = await this.toastController.create({
          message: error.error.detail, duration: 2000
        });
        await toast.present();
        this.loadingService.stopLoading();
        this.form.enable();
        this.shouldDisabled = false;
      });
    } else {
      const toast = await this.toastController.create({
        message: 'invalid form',
        duration: 2000
      });
      await toast.present();
    }
  }

  getProfileData() {
    this.userService.myProfile().subscribe(data => {
      this.profileInfo = data.first_name;
      localStorage.setItem('profile_details', this.profileInfo);
    });
  }

  redirectPage(urlSlug: string) {
      this.router.navigateByUrl('/' + urlSlug);
  }

  redirectToExterNalLink(){
    window.location.href = "https://form.jotform.com/222772442487058";
  }
}
