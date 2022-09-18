import { NotificationService } from './../../services/notification.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  year: any;
  loginData = {
    "email": "",
    "password": ""
  }
  isFormSubmitted = false;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private notifyService: NotificationService
  ) { }


  ngOnInit(): void {
    this.year = new Date().getFullYear();
    if (this.authService.isLogin()) {
      this.router.navigate(['']);
    }
  }

  async login(loginForm: any) {
    this.isFormSubmitted = true;
    if (loginForm.valid) {
      const data: any = await lastValueFrom(this.userService.login(this.loginData));
      if(data.model === null){
        this.router.navigate(['login']);
        this.notifyService.showError(data.message)
      }else{                       
        this.notifyService.showSuccess("login successful.");    
        setTimeout(()=>{                        
          this.authService.setUserInfo(data.model);
          this.router.navigate(['']);
      }, 0);
       
      }

    }

  }


}
