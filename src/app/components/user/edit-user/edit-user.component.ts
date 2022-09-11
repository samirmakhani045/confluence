import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  isFormSubmitted = false;
  editUserData = {
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
    roleId:""
  }

  roles = ["plumber","other" ]
  constructor() { }

  ngOnInit(): void {
    
  }

  submit(form: any) {
    this.isFormSubmitted = true;
  }


}
