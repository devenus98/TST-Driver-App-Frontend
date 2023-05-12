import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public loading: any;

  constructor(private loadingController: LoadingController) {
  }

  async startLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Lädt...',
      duration: 2000
    });
    this.loading.present();
  }

  stopLoading() {
    this.loading.dismiss();
  }
}
