import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private apiSevice: ApiService
  ) { }

  save(data: any) {
    return this.apiSevice.post(environment.api_url, 'Report/SaveReport' , data)
  }

  getById(id:any){
    return this.apiSevice.get(environment.api_url, `Report/${id}`)
  }

  getAllReport(){
    return this.apiSevice.get(environment.api_url, 'Report/All')
  }
  
  deleteReport(id: string) {
    return this.apiSevice.delete(environment.api_url, `Report/${id}`);
  }

  updateReportStatus(data: any) {
    return this.apiSevice.post(environment.api_url, `Report/UpdateReportStatus?ReportIds=${data.ReportIds}&isFinalize=true`, {});
  }

  getDashboardReport(){
    return this.apiSevice.get(environment.api_url, 'Report/GetDashboardReport')
  }

  getReportFilterData(data: any) {
    let params = new HttpParams();
    if (data.userID) {
      params = params.append("UserID", data.userID);
    }
    if (data.broughID) {
      params = params.append("BoroughID", data.broughID);
    }
    if (data.streetname) {
      params = params.append("Streetname", data.streetname);
    }
    if (data.ownerName) {
      params = params.append("OwnerName", data.ownerName);
    }
    if (data.dateOfInitialInspection) {
      params = params.append("DateOfInitialInspection", data.dateOfInitialInspection);
    }
    if (data.finalizeDate) {
      params = params.append("FinalizeDate", data.finalizeDate);
    }
    return this.apiSevice.get(environment.api_url, `Report/GetReportFilterData`, params)
  }
}
