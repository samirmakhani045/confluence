import { ReportService } from './../../services/report.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import * as moment from 'moment';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  queryData = {
    userID: '',
    broughID: '',
    streetname: '',
    ownerName: '',
    dateOfInitialInspection: '',
    finalizeDate: ''
  }
  isLoading = false;

  reportData :any

  constructor(
    private router : Router,
    private reportservice : ReportService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getAllReport();
    this.isLoading = false;
  }

  async getAllReport(){

    let reportData : any = {}
    if (this.queryData.userID || this.queryData.broughID || this.queryData.streetname || this.queryData.ownerName || this.queryData.dateOfInitialInspection) {
      reportData = await lastValueFrom(this.reportservice.getReportFilterData(this.queryData));
    } else {
      reportData = await lastValueFrom(this.reportservice.getAllReport());
    }
    this.reportData = reportData.model;
  }

  addReportData(){
    this.router.navigate([`report/add`])
  }

  markFinalize(report : any) {
    Swal.fire({
      title: 'Are you sure want to mark finilize?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, i want!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.value) {
        let body = new FormData();
        const data = {
          ReportIds: report.id,
          isFinalize: true
        }
        await lastValueFrom(this.reportservice.updateReportStatus(data));
        this.getAllReport();
      }
    })
  }

  editUserData(id:any){
    this.router.navigate([`report/${id}`])

  }

async  deleteUserData(id:any){
  Swal.fire({
    title: 'Are you sure want to remove?',
    text: '',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then(async (result) => {
    if (result.value) {
      await lastValueFrom(this.reportservice.deleteReport(id));
      this.getAllReport();
    }
  })
  }

}
