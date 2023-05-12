import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private httpClient: HttpClient) {
  }

  getTrips(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + '/api/trip/');
  }

  postDuty(data): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/api/activity/start/', data);
  }

  currentState(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + '/api/activity/me/');
  }

  startSleep(data): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/api/activity/sleep/start/', data);
  }

  resumeDriving(data): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/api/activity/sleep/resume/', data);
  }

  stopDuty(data): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/api/activity/stop/', data);
  }

  getOverView(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + '/api/trip/overview/');
  }

  postTrip(data): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/api/trip/', data);
  }
}
