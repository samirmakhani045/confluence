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
    private router: Router
  ) { }


  ngOnInit(): void {
    this.year = new Date().getFullYear();

  }

  async login(loginForm: any) {
    this.isFormSubmitted = true;
    if (loginForm.valid) {
      const data: any = await lastValueFrom(this.userService.login(this.loginData));
      // const data = {
      //   "model": {
      //     "id": 1,
      //     "firstName": "Admin",
      //     "lastName": "",
      //     "middleInitial": null,
      //     "businessName": "CCCAPP",
      //     "businessTelephone": "+14795641230",
      //     "businessFax": null,
      //     "address": "UK",
      //     "city": "UK",
      //     "state": "UK",
      //     "zipCode": "UK",
      //     "mobileTelephone": null,
      //     "email": "ccc_app@yopmail.com",
      //     "employerName": null,
      //     "licenseNumber": null,
      //     "password": "F+YcjIB4md0N8MJiljol5TdxTVVwZURKPQ==",
      //     "roleId": 3,
      //     "passwordSalt": "7qMUpeDJ=",
      //     "deviceTokenId": null,
      //     "token": null,
      //     "roles": null,
      //     "isActive": true,
      //     "isDelete": false,
      //     "createdDate": null,
      //     "createdBy": null,
      //     "modifyDate": null,
      //     "modifyBy": null
      //   },
      //   "success": true,
      //   "message": "Successfully Login",
      //   "errorCode": null,
      //   "data": null
      // }
      this.authService.setUserInfo(data.model);
      this.router.navigate([''])
    }

  }


}
