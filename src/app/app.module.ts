import { ApiInterceptor } from './interceptor/api.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/header/header.component';
import { SidnavComponent } from './components/sidnav/sidnav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { RoleService } from './services/role.service';
import { MatDialogModule } from '@angular/material/dialog';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportComponent } from './components/report/report.component';
import { EditReportComponent } from './components/report/edit-report/edit-report/edit-report.component';
import { ObservableService } from './services/observable.service';
import { BoroughService } from './services/borough.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidnavComponent,
    DashboardComponent,
    UserComponent,
    EditUserComponent,
    ReportComponent,
    EditReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule
  ],
  providers: [
    ApiService,
    AuthService,
    UserService,
    RoleService,
    ObservableService,
    BoroughService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
