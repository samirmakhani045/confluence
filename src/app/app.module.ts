import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/header/header.component';
import { SidnavComponent } from './components/sidnav/sidnav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportComponent } from './components/report/report/report.component';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { RoleService } from './services/role.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidnavComponent,
    DashboardComponent,
    UserComponent,
    ReportComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ApiService,
    AuthService,
    UserService,
    RoleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }