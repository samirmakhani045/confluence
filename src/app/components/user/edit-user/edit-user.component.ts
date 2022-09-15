import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from './../../../services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { findIndex, lastValueFrom, pluck } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  [x: string]: any;

  isFormSubmitted = false;
  editUserData: any = {
    firstName: "",
    lastName: "",
    middleInitial: "",
    businessName: "",
    businessTelephone: "",
    businessFax: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    mobileTelephone: "",
    email: "",
    employerName: "",
    licenseNumber: "",
    password: "",
    roleId: ""
  }
  editId: any = '';

  roles: any = [];
  constructor(
    private userService: UserService,
    private notifyService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private toster: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllRole();
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.get('id') !== 'add') {
        this.editId = paramMap.get('id');
        this.getById()
      }
    })
  }

  async getById() {
    const data: any = await lastValueFrom(this.userService.getById(this.editId));
    this.editUserData = data.model;
  }

  Back(){
    this.router.navigate(['user']);
  }

  async submit(form: any) {
    this.isFormSubmitted = true;
    if (form.valid) {
      try {
        let body = new FormData();
        body.append('firstName', this.editUserData.firstName);
        body.append('lastName', this.editUserData.lastName);
        body.append('middleInitial', this.editUserData.middleInitial);
        body.append('businessName', this.editUserData.businessName);
        body.append('businessTelephone', this.editUserData.businessTelephone);
        body.append('businessFax', this.editUserData.businessFax);
        body.append('address', this.editUserData.address);
        body.append('city', this.editUserData.city);
        body.append('state', this.editUserData.state);
        body.append('zipCode', this.editUserData.zipCode);
        body.append('mobileTelephone', this.editUserData.mobileTelephone);
        body.append('email', this.editUserData.email);
        body.append('employerName', this.editUserData.employerName);
        body.append('licenseNumber', this.editUserData.licenseNumber);
        if (!this.editId) {
          body.append('password', this.editUserData.password);
        }
        body.append('roleId', this.editUserData.roleId);
        if(this.editId) {
          const data: any = await lastValueFrom(this.userService.update(this.editId, body));
          this.notifyService.showSuccess("user Edited successful.")
          this.afterAPI(data, true);
          
        } else {
          const data: any = await lastValueFrom(this.userService.save(body));
          this.notifyService.showSuccess("user added successful.")
          this.afterAPI(data, false);
         
        }

      } catch (error) {
        console.log("🚀 ~ file: edit-user.component.ts ~ line 48 ~ EditUserComponent ~ submit ~ error", error)
      }
    }
  }

  afterAPI(data : any, isUpdate : boolean) {
    if (data && data.model) {
      this.router.navigate(['user'])
    }
  }

  async getAllRole() {
    const data: any = await lastValueFrom(this.userService.getAllRole());
    if (data.success === true) {
      this.roles = data.model;
      const index: number = this.roles.indexOf("Super Admin");
      this.roles.splice(index, 1);
    } else {
      this.notifyService.showError(data.message)
    }

  }
}
