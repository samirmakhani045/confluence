import { AuthService } from './../../../../services/auth.service';
import { ReportService } from './../../../../services/report.service';
import { NotificationService } from './../../../../services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BoroughService } from 'src/app/services/borough.service';

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

  userData :any = []
  isFormSubmitted = false;
  reportData: any = {}
  editId:any
  allBorough : any = []

  private _http: any;
  constructor(
    private router: Router,
    private userService: UserService,
    private notifyService: NotificationService,
    private reportService: ReportService,
    private authService: AuthService,
    private boroughService: BoroughService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    await this.getAllUser();
    await this.getAllBorough();
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.get('id') !== 'add') {
        this.editId = paramMap.get('id');
        this.getById()
      }
    })
  }

  async getAllBorough() {
    const data: any = await lastValueFrom(this.boroughService.getAllBorough());
    this.allBorough = data.model;
  }

  async getAllUser(){
    let data: any = await lastValueFrom(this.userService.getAllUser());
    this.userData = data.model;
  }

  parseDate(target: any){
    if (target.value) {
        return new Date(target.value);
    }
    return null;
  }

  async getById(){
    const data: any = await lastValueFrom(this.reportService.getById(this.editId));
    this.reportData = data.model;
    this.reportData.dateOfInitialInspection = new Date(this.reportData.dateOfInitialInspection)
    console.log("🚀 ~ file: edit-report.component.ts ~ line 55 ~ EditReportComponent ~ getById ~ this.reportData", this.reportData)
  }

  async submit(form: any) {
    this.isFormSubmitted = true;
    // this.reportData.dateOfInitialInspection = new Date(this.reportData.dateOfInitialInspection)
    if (form.valid) {
      try {
        let body = new FormData();
        body.append('UserId', this.reportData.userId);
        body.append('HouseNo', this.reportData.houseNo);
        body.append('StreetName', this.reportData.streetName);
        body.append('OwnerName', this.reportData.ownerName);
        body.append('BoroughId', this.reportData.boroughId);
        body.append('Block', this.reportData.block);
        body.append('LOT', this.reportData.lot);
        body.append('BIN', this.reportData.bin);
        body.append('CommunityBoardNo', this.reportData.communityBoardNo);
        body.append('NumberOfStories', this.reportData.numberOfStories);
        body.append('NumberOfMeters', this.reportData.numberOfMeters);
        body.append('ActiveMeters', this.reportData.activeMeters);
        body.append('AdditionalComments', this.reportData.additionalComments);
        body.append('IsAdditionalCommentsImage', this.reportData.isAdditionalCommentsImage);
        body.append('AdditionalCommentsImageName', this.reportData.additionalCommentsImageName);
        body.append('DateOfInitialInspection', new Date(this.reportData.dateOfInitialInspection).toISOString());
        let data : any = {};
        if (this.reportData.id) {
          body.append('Id', this.reportData.id);
          data = await lastValueFrom(this.reportService.save(body));
        } else {
          data = await lastValueFrom(this.reportService.save(body));
        }
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
