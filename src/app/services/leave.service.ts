import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  url = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  getLeave(): Observable<any> {
    return this.httpClient.get(this.url + '/api/leave/');
  }

  postLeave(data): Observable<any> {
    return this.httpClient.post(this.url + '/api/leave/', data);
  }

  retrieveLeave(id: string): Observable<any> {
    return this.httpClient.get(this.url + '/api/leave/' + id);
  }

  updateLeave(id: string, value: any): Observable<any> {
    return this.httpClient.put(this.url + '/api/leave/' + id+'/', value);
  }

  acceptSuggestedLeave(id: any): Observable<any> {
    return this.httpClient.post(this.url + '/api/leave/'+id+'/approve/', '');
  }

  declineSuggestedLeave(id: any): Observable<any> {
    return this.httpClient.post(this.url + '/api/leave/'+id+'/decline/', '');
  }

}
