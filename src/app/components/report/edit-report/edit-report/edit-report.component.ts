import { AuthService } from './../../../../services/auth.service';
import { ReportService } from './../../../../services/report.service';
import { NotificationService } from './../../../../services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss']
})
export class EditReportComponent implements OnInit {

  roles: any;
  plumberId: any
  roleName: any
  plumberData: any
  plumberEmail: any

  isFormSubmitted = false;
  reportData: any = {
    id : 0,
    boroughId : 0,
    userId: "",
    houseNo: "",
    streetName: "",
    ownerName: "",
    block: "",
    lot: "",
    bin: "",
    communityBoardNo: "",
    numberOfStories: "",
    numberOfMeters: "",
    activeMeters: "",
    additionalComments: "",
    additionalCommentsImageName: "",
    dateOfInitialInspection: "",
    isAdditionalCommentsImage: true,
    isFinalize: true,
  }
  editId:any

  private _http: any;
  constructor(
    private router: Router,
    private userService: UserService,
    private notifyService: NotificationService,
    private reportService: ReportService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.get('id') !== 'add') {
        this.editId = paramMap.get('id');
        this.getById()
      }
    })
  }

  async getById(){
    const data: any = await lastValueFrom(this.reportService.getById(this.editId));
    this.reportData = data.model;
    console.log("🚀 ~ file: edit-report.component.ts ~ line 67 ~ EditReportComponent ~ getById ~  this.reportData",  this.reportData)
    debugger
  }



  async submit(form: any) {
    this.isFormSubmitted = true;
    let userId = this.authService.getUserInfo();
    if (form.valid) {
      try {
        if (userId.id) {
          this.reportData.userId = userId.id;
        } else {
          this.reportData.userId = 0;
        }
        this.reportData.dateOfInitialInspection = new Date(this.reportData.dateOfInitialInspection).toISOString();
        let body = new FormData();
        body.append('userId', this.reportData.userId);
        body.append('houseNo', this.reportData.houseNo);
        body.append('streetName', this.reportData.streetName);
        body.append('ownerName', this.reportData.ownerName);
        body.append('block', this.reportData.block);
        body.append('lot', this.reportData.lot);
        body.append('communityBoardNo', this.reportData.communityBoardNo);
        body.append('numberOfStories', this.reportData.numberOfStories);
        body.append('numberOfMeters', this.reportData.numberOfMeters);
        body.append('additionalComments', this.reportData.additionalComments);
        body.append('additionalCommentsImageName', this.reportData.additionalCommentsImageName);
        body.append('isFinalize', this.reportData.isFinalize);
        body.append('employerName', this.reportData.employerName);
        body.append('licenseNumber', this.reportData.licenseNumber);
        const data: any = await lastValueFrom(this.reportService.save(body));
        if(data.success === true){
          this.notifyService.showSuccess(data.message);
          this.router.navigate(['report'])
        }else{
          this.notifyService.showError(data.message);
        }

      } catch (error) {
        console.log("🚀 ~ file: edit-report.component.ts ~ line 98 ~ EditReportComponent ~ submit ~ error", error)
      }
    }

  }

  Back() {
    this.router.navigate(['report']);
  }

}
