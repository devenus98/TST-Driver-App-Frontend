import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, interval, Observable, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  API: string = environment.baseUrl;
  notifications:BehaviorSubject<any> = new BehaviorSubject([])

  constructor(
    private http: HttpClient,
  ) {
    this.getNotifications().toPromise();
    interval(20000).pipe(switchMap(()=>this.getNotifications())).subscribe()
   }

  fetchNotificationData(): Observable<any>{
    return this.notifications.asObservable()
  }

  private getNotifications(){
   return this.http.get(this.API + '/api/notification/').pipe(
     tap(e =>this.notifications.next(e))
   );
  }

  fetchNotificationDataById(id:string|number): Observable<any>{
    return this.http.get(this.API + `/api/notification/${id}`);
  }

  putNotificationDataById(id:string|number,data:any): Observable<any>{
    return this.http.put(this.API + `/api/notification/${id}/`,data).pipe(
      tap(()=>{
        this.getNotifications().toPromise()
      })
    );
  }
  
}
