import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }
  
  setUserInfo(data: any) {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }

  getUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    return userInfo;
  }

  isLogin() {
    if (localStorage.getItem('userInfo')) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/login'])
  }

}
