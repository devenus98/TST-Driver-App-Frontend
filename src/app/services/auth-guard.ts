import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.userService.isLoggedIn({token: localStorage.getItem('access')}).subscribe(ns => true, error => {
      this.userService.updateToken({refresh:localStorage.getItem('refresh')}).subscribe(data=>{
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        return true;
      }, err=> {
        localStorage.clear();
        this.router.navigateByUrl('/login');
        return false;
      });
    });
    return true;
  }
}
