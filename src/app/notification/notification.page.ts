import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from './../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  notificationData:any[] = [];
  subscription:Subscription = new Subscription()

  constructor(
    public router: Router,
    private notificationService:NotificationService
  ) { 
    this.getNotificationData()
  }

  ngOnInit(): void {
   
  }

  getNotificationData() {
   this.subscription.add(
    this.notificationService.fetchNotificationData().subscribe(res => {
      this.notificationData = res;
      console.log('notify->>>>>>>>>>>>>>>>>>>', this.notificationData);
    })
   )
  }

  getNotificationDataById(id:string|number, noti_type: any){
    this.notificationService.putNotificationDataById  (id,{"is_seen":true}).toPromise()
    if(noti_type == 'Suggested leave'){
       this.redirectPage('myleaves');
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  redirectPage(urlSlug: string) {
    this.router.navigate(['/'+ urlSlug,{tab:'suggested'}]);
}

}
