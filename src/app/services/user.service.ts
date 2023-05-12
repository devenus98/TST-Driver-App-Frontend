import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.baseUrl;

  constructor(private httpClient: HttpClient) {

  }

  login(data): Observable<any> {
    return this.httpClient.post(this.url + '/auth/token/', data);
  }

  register(value: any): Observable<any> {
    return this.httpClient.post(this.url + '/api/user/register/', value);
  }


  isLoggedIn(data): Observable<any> {
    return this.httpClient.post(this.url + '/auth/token/verify/', data);
  }

  myProfile(): Observable<any> {
    return this.httpClient.get(this.url + '/api/user/profile/').pipe(
      tap(data => {
        localStorage.setItem('userInfo', JSON.stringify(data))
      })
    );
  }

  changePassword(value: any): Observable<any> {
    return this.httpClient.post(this.url + '/api/user/change_password/', value);
  }

  updateToken(data: any): Observable<any> {
    return this.httpClient.post(this.url + '/auth/token/refresh/', data);
  }

  profileDetail(): Observable<any> {
    return this.httpClient.get(this.url + '/api/user/detail/');
  }

  updateProfile(data: any): Observable<any> {
    return this.httpClient.post(this.url + '/api/user/update/', data);
  }

  resetPassword(data: any): Observable<any> {
    return this.httpClient.post(this.url + '/api/user/forget_password/', data);
  }

  verifyOtp(data: any): Observable<any> {
    return this.httpClient.post(this.url + '/api/user/otp/verify/', data);
  }

  setNewPassword(data: any): Observable<any> {
    return this.httpClient.post(this.url + '/api/user/set_new_password/', data);
  }

  profileImgUpload(data: any): Observable<any> {
    return this.httpClient.post(this.url + '/api/user/Profile_image/', data);
  }

  profileImgView(): Observable<any> {
    return this.httpClient.get(this.url + '/api/user/Profile_image/view');
  }

  
}