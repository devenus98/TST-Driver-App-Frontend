import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder,AbstractControl, FormGroup, Validators, FormControl} from '@angular/forms';
import {UserService} from '../services/user.service';
import {ToastController} from '@ionic/angular';
import {LoadingService} from '../services/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public form: FormGroup;
  public shouldDisable = false;
  submitted = false;

  constructor(public router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              public toastController: ToastController,
              private loadingService: LoadingService
              ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]),
      password2: new FormControl(null, [Validators.required]),
      // phone_number: new FormControl(null, [Validators.required,Validators.pattern("^[+][0-9]{12}$")]),
      phone_number: new FormControl(''),
      location: new FormControl(null, [Validators.required]),
      hourly_price: new FormControl(''),
      leaving_date:new FormControl(''),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls; 
  }

  async submitRegisterData() {

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

    if (this.form.valid) {
      this.form.disable();
      this.shouldDisable = true;
      await this.loadingService.startLoading();
      this.userService.register(this.form.value).subscribe(async res => {
        this.loadingService.stopLoading();
        const toast = await this.toastController.create({
          message: 'Account is created successfully',
          position: 'top',
          duration: 1000
        });
        await toast.present();
        this.redirectToLogin();
      }, async error => {
        this.loadingService.stopLoading();
        const toast = await this.toastController.create({
          message: 'Something went wrong',
          position: 'top',
          duration: 2000
        });
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


  redirectToLogin(){
    setTimeout(() => {  
      this.form.reset();
      this.router.navigateByUrl('/login');
    }, 1500);
  }

  ionViewDidEnter() {
    document.addEventListener("backbutton",function(e) {
      // Do nothing
    }, false);
  }

  ionViewDidLeave(){
    document.addEventListener("backbutton",function(e) {
      // Do nothing
    }, true);
  }
}
