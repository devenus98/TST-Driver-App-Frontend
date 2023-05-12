import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const lang = localStorage.getItem('language');
    // const userToken = localStorage.getItem('access');

    const accessToken = localStorage.getItem('access');
    // const modifiedReq = req.clone({
    //   headers: req.headers.set('Authorization', `Bearer ${userToken}`).set('Accept-Language', lang),
    // });
    // return next.handle(modifiedReq);

    let headers: any = {};
    if (!req.url.includes('token')) {
    headers = {
      Authorization: `Bearer ${accessToken || ''}`,
      'X-Api-Key': 'GBjeA43m.xyNgiaiIizEWXs4t3vMDDA4zT4lQ7h1R',
      'Accept-Language': lang
      // 'Access-Control-Allow-Origin': '*'
    }
    }

    const setToken = req.clone({
      setHeaders: headers
    });
    return next.handle(setToken).pipe();
  }
  
}