import { MatDialog } from '@angular/material/dialog';
 import { NotificationService } from './../../services/notification.service';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { ObservableService } from 'src/app/services/observable.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  isLoading = false;
  
  roles: any = [];
  userdata: any;
  roleid: any = '';
  queryData = {
    firstName: '',
    lastName: '',
    businessName: '',
    roleId: ''
  }
  constructor(
    private router: Router,
    private userService: UserService,
    private notifyService: NotificationService,
    public dialog: MatDialog,
    private observableService: ObservableService
  ) { }

  async ngOnInit() {
    this.isLoading = true;
    await this.getAllRole();
    this.getAllUser();
    this.isLoading =  false
  }

  async getAllRole() {
    const data: any = await lastValueFrom(this.userService.getAllRole());
    if (data.success === true) {
      this.roles = data.model;
    } else {
      this.notifyService.showError(data.message)
    }

  }

  editUserData(value: any) {
    this.router.navigate([`user/${value}`])
  }

  async deleteUserData(id: any) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.value) {
        await lastValueFrom(this.userService.deleteUser(id));
        this.getAllUser();
      }
    })
  }

  async getAllUser() {
    let userData : any = {}
    if (this.queryData.firstName || this.queryData.lastName || this.queryData.businessName || this.queryData.roleId) {
      userData = await lastValueFrom(this.userService.getUserFilterData(this.queryData));
    } else {
      userData = await lastValueFrom(this.userService.getAllUser());
    }
    this.userdata = userData.model;
    for (let index = 0; index < this.userdata.length; index++) {
      const element = this.userdata[index];
      if (element.roleId) {
        const role = this.roles.find((r: any) => r.id === element.roleId);
        if (role) {
          this.userdata[index].role = role.roleName
        }
      }
    }
  }

  async changeActive(item: any) {
    let body = new FormData();
    body.append('UserIds', item.id);
    body.append('isActive', JSON.stringify(!item.isActive));
    await lastValueFrom(this.userService.updateUsersEnableDisable(body))
  }

  addUserData() {
    this.router.navigate(['user/add'])
  }

}
