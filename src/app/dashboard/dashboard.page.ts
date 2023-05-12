import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { NotificationService } from './../services/notification.service';

import { Camera, CameraOptions, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { environment } from '../../environments/environment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  profileInfo: any;
  showProgress = true;

  mediaUrl: any = environment.assestUrl;
  profileImg: any;
  imageUrl: any;

  showNotification: boolean = false;
  notificationData: any[] = [];
  notCount: any;

  constructor(private userService: UserService,
    public router: Router,
    private loadingService: LoadingService,
    private notifService: NotificationService,
    private toastController: ToastController,
    ) {
  }
  async ionViewDidEnter() {
    await this.userProfiles();
    await this.getProfileImg();
  }

  async ngOnInit() {
  
  }

  async userProfiles(){
    this.loadingService.startLoading();
    this.userService.myProfile().subscribe(data => {
      this.showProgress = false;
      this.profileInfo = data;
      this.loadingService.stopLoading();
      this.getNotificationData();
    }, error => {
      this.loadingService.stopLoading();
    });
  }

  async refresh(e) {
    await this.userProfiles();
    e.target.complete();
  }

  openNotification(state: boolean) {
    this.showNotification = state;
  }

  getNotificationData() {
    this.notifService.fetchNotificationData().subscribe(res => {
      this.notificationData = res;
      this.notCount = res.filter((e:any)=>e.is_seen == false).length;
    })
  }

  getNotificationDataById(id:string|number){
    this.notifService.putNotificationDataById  (id,{"is_seen":true}).toPromise()
  }

  minTwoDigits(n: any) {
    return (n < 10 ? '0' : '') + n;
  }

  async takePicture() {
    let options: CameraOptions = {
      quality: 100,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Uri,
      allowEditing:false
    };
  
    await Camera.getPhoto(options).then(async (image)=>{
      if (image.webPath) {
        this.profileImg = image.webPath;
        this.imageUrl = await fetch(image.webPath).then(r => r.blob());
        await this.uploadProfilePic();
      }
    });
}

async uploadProfilePic(){
  let formData = new FormData();
  if(this.imageUrl != undefined){
    formData.append('Profile_image', this.imageUrl, 'profileImage.jpg');
  }
  this.imageUrl = this.profileImg;
  await this.loadingService.startLoading();
  this.userService.profileImgUpload(formData).subscribe( async data => {
      const toast = await this.toastController.create({
        message: 'Profile Image uploaded',
        duration: 2000
      });
      await toast.present();
      await this.getProfileImg();
      this.loadingService.stopLoading();
  }, async error => {
    const toast = await this.toastController.create({
      message: error.error.error,
      duration: 2000
    });
    await toast.present();
    this.loadingService.stopLoading();
  });
}

async getProfileImg(){
  this.userService.profileImgView().subscribe( async data => {
     this.imageUrl = this.mediaUrl+data?.Profile_image;
  }, async error => {
//
  });
}
}
