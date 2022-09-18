import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { AuthGuard } from './auth/auth.guard';
import { ReportComponent } from './components/report/report.component';
import { EditReportComponent } from './components/report/edit-report/edit-report/edit-report.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'user', component: UserComponent, canActivate:[AuthGuard] },
  { path: 'user/:id', component: EditUserComponent, canActivate:[AuthGuard] },
  { path: 'report', component: ReportComponent, canActivate:[AuthGuard] },
  {path: 'report/:id', component: EditReportComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
