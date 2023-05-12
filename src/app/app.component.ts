import { Component } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingService } from './services/loading.service';
import { UserService } from './services/user.service';
import { TranslationService } from './services/translation.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { ActionSheetController } from '@ionic/angular';
import { NotificationService } from './services/notification.service';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [SplashScreen, StatusBar]
})
export class AppComponent {
  defaultPath = 'assets/imgs/menu-icon/';
  currentPageTitle = 'profile';
  selectedIndex: any;
  profileInfo: any;
  name: any;

  showNotification: boolean = false;
  notificationData: any[] = [];
  notCount: any;

  appPages = [
    {
      title: 'MENU.DASHBOARD',
      url: '/tabs/dashboard',
      icon: this.defaultPath + '1.png'
    },
    {
      title: 'MENU.LOGBOOK',
      url: '/tabs/logbook',
      icon: this.defaultPath + '2.png'
    },
    {
      title: 'MENU.MY_LEAVES',
      url: '/myleaves',
      icon: this.defaultPath + '3.png'
    },
    {
      title: 'MENU.APPLY_FOR_LEAVES',
      url: '/applyforleave',
      icon: this.defaultPath + '4.png'
    },
    {
      title: 'MENU.CHANGE_PASSWORD',
      url: '/changepassword',
      icon: this.defaultPath + '5.png'
    },
    {
      title: 'MENU.LOGOUT',
      url: '/login',
      icon: this.defaultPath + '6.png'
    }
  ];
  lang: any = 'en'
  constructor(private menu: MenuController,
    private router: Router,
    private loadingService: LoadingService,
    private userService: UserService,
    private translation: TranslationService,
    public platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private actionSheet: ActionSheetController,
    private notifService: NotificationService,
    private toastCtrl: ToastController,
  ) {
    this.lang = localStorage.getItem('language') || null;
    this.statusBar.backgroundColorByHexString('#3880ff');
  }


  logOut = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.router.navigateByUrl('/tabs/dashboard');
    this.router.navigateByUrl('/login');
  }

  async ngOnInit() {
    Network.addListener('networkStatusChange', async status => {
      console.log('Network status changed', status);
      if(status.connected == true){
        const toast: any = await this.toastCtrl.create({
          position: 'top',
          cssClass: 'toast-success',
          message: "You are online now",
          duration: 5000
        });
        await toast.present();
      }else{
        const toast: any = await this.toastCtrl.create({
          position: 'top',
          cssClass: 'toast-error',
          message: "You are OFFLINE",
          duration: 5000
        });
        await toast.present();
      }
    });
    this.checkLogin();
    this.initializeApp();
    this.getNotificationData();
  }

  checkLogin() {
    if (localStorage.getItem('access') && localStorage.getItem('refresh')) {
      this.userService.isLoggedIn({ token: localStorage.getItem('access') }).subscribe(data => {
        this.router.navigateByUrl('/tabs/dashboard', { replaceUrl: true });
      });
    }
  }

  toggleMenu() {
    let dt = this.menu.toggle();
  }

  changeLang(event: any) {
    this.translation.setLanguage(event.detail.value)
  }

  getProfileData() {
    this.userService.myProfile().subscribe(data => {
      this.profileInfo = data;
      this.name = this.profileInfo.first_name;
    });
  }

  ionWillOpen() {
    if (localStorage.getItem("userInfo")) {
      let loc = localStorage.getItem('userInfo') || "{}"
      this.profileInfo = JSON.parse(loc);
      this.name = this.profileInfo.first_name;
    } else if (localStorage.getItem("access")) {
      this.getProfileData()
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 2000);
      if (!!!this.lang) {
        this.selectLang()
      }
    });
  }

  async selectLang() {
    const actionSheet = await this.actionSheet.create({
      header: 'Select Language',
      cssClass: 'language',
      backdropDismiss: false,
      buttons: [
        {
          text: 'English',
          role: 'en',
          handler: () => {

          }
        },
        {
          text: 'German',
          role: 'ge',
          handler: () => {
 
          }
        },
        {
          text: 'Polish',
          role: 'pl',
          handler: () => {

          }
        },
        {
          text: 'Russian',
          role: 'ru',
          handler: () => {
          }
        },
        {
          text: 'Turkey',
          role: 'tr',
          handler: () => {

          }
        },
      ]
    });
    await actionSheet.present();
    const { role } = await actionSheet.onDidDismiss();
    if (!!['en', 'ge','pl','ru','tr'].includes(role)) {
      this.translation.setLanguage(role);
      this.lang = role;
    }
  }

  openNotification(state: boolean) {
    this.showNotification = state;
  }

  getNotificationData() {
    this.notifService.fetchNotificationData().subscribe(res => {
      console.log('data.//////////////', res);
      this.notificationData = res;
      this.notCount = res.filter((e:any)=>e.is_seen == false).length;
    })
  }

  getNotificationDataById(id:string|number){
    this.notifService.putNotificationDataById  (id,{"is_seen":true}).toPromise()
  }

}
