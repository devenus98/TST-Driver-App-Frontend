import {Component, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {UserService} from '../services/user.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {LoadingService} from '../services/loading.service';
import { Camera, CameraOptions, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  mediaUrl: any = environment.assestUrl;

  userInfo: any;
  profileImg: any;
  imageUrl: any;
 
  constructor(
    private loadingService: LoadingService,
    private userService: UserService,
    private toastController: ToastController,
    private location: Location,
    public router: Router
  ) {
  }

  async ngOnInit() {
    this.getProfileImg();
    this.initUserDetails();
  }

  async initUserDetails(){
    await this.loadingService.startLoading();
    this.userService.profileDetail().subscribe(data => {
      this.userInfo = data;
      this.loadingService.stopLoading();
    }, async error => {
      const toast = await this.toastController.create({
        message: error.error.error,
        duration: 2000
      });
      await toast.present();
      this.loadingService.stopLoading();
      this.location.back();
    });
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
    console.log(formData)
    await this.loadingService.startLoading();
    this.userService.profileImgUpload(formData).subscribe( async data => {
        const toast = await this.toastController.create({
          message: 'Profile Image uploaded',
          duration: 2000
        });
        await toast.present();
        this.loadingService.stopLoading();
        await this.getProfileImg();
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
       console.log(this.imageUrl);
    }, async error => {
//
    });
  }

}
