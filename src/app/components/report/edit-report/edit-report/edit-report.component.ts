import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss']
})
export class EditReportComponent implements OnInit {

  isFormSubmitted = false;
  reportData:any = {
    houseNo : "",
    streetName : "",
    ownerName : "",
    block : "",
    lot : "",
    bin : "",
    communityBoardNo : "",
    numberOfStories : "",
    numberOfMeters : "",
    activeMeters : "",
    additionalComments : "",
    additionalCommentsImageName : "",
    dateOfInitialInspection : "",
    isAdditionalCommentsImage : true,
    isFinalize : true,
    plumberInformation : {
      id : 0,
      fName : "",
      lName : "",
      middleInital : "",
      businessName : "",
      businessTelephone : "",
      businessFax : "",
      address : "",
      city : "",
      state : "",
      zipCode : "",
      mobile : "",
      email : "",
      licenceNumber : "",
      reportId : 0
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

  submit(form: any) {
    this.isFormSubmitted = true;
    debugger
  }

}
