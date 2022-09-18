import { ReportService } from './../../services/report.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';


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

  reportData :any

  constructor(
    private router : Router,
    private reportservice : ReportService
  ) { }

  ngOnInit(): void {
    this.getAllReport();
  }

  async getAllReport(){
    let data:any = await lastValueFrom(this.reportservice.getAllReport());
    this.reportData = data.model;
    console.log("🚀 ~ file: report.component.ts ~ line 36 ~ ReportComponent ~ getAllReport ~ this.reportData", this.reportData)
  }

  addReportData(){
    this.router.navigate([`report/add`])
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
