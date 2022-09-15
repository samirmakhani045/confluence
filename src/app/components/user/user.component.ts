import { NotificationService } from './../../services/notification.service';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  roles: any = [];
  userdata:any;
  roleid:any = '';
  isctive = false;
  isDeactive = false;

  constructor(
    private router: Router,
    private userService : UserService,
    private notifyService : NotificationService
  ) { }

  ngOnInit(): void {
    this.getAllRole();  
    this.getAllUser();
   
  }

  async getAllRole() {
    const data: any = await lastValueFrom(this.userService.getAllRole());
    if (data.success === true) {
      this.roles  = data.model;
    } else {
      this.notifyService.showError(data.message)
    }
    
  }

  editUserData(value:any){
    this.router.navigate([`user/${value}`])
  }

 async deleteUserData(id:any){
  if(confirm("Are you sure to delete user")) {
    console.log("Implement delete functionality here");
  }
  let res = await lastValueFrom(this.userService.deleteUser(id)); 
  this.getAllUser();
  debugger
  }

   async getAllUser(){
    this.userdata = await lastValueFrom(this.userService.getAllUser()); 
    this.userdata = this.userdata.model;
    for (let index = 0; index < this.userdata.length; index++) {
      const element = this.userdata[index];
      if(element.roleId){
        const role = this.roles.find((r : any) => r.id === element.roleId);
        if (role) {
          this.userdata[index].role = role.roleName
        }    
      }
    }
    
  }



  addUserData() {
    this.router.navigate(['user/add'])
  }

}
