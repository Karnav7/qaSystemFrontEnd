import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { QuestionsetComponent } from './questionset/questionset.component';
import { AdminReviewComponent } from './admin-review/admin-review.component';
import { TestHomeComponent } from './test-home/test-home.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard]},
  {path: 'employee-dashboard', component: EmployeeDashboardComponent, canActivate: [AuthGuard]},
  {path: 'questionset', component: QuestionsetComponent, canActivate: [AuthGuard]},
  {path: 'adminreview', component: AdminReviewComponent, canActivate: [AuthGuard]},
  {path: 'test-home', component: TestHomeComponent, canActivate: [AuthGuard]},
  {path: 'employee-profile', component: EmployeeProfileComponent, canActivate: [AuthGuard]},
  {path: 'reset-password', component: PasswordResetComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
