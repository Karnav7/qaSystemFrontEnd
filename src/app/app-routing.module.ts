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

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'admin-dashboard', component: AdminDashboardComponent},
  {path: 'employee-dashboard', component: EmployeeDashboardComponent},
  {path: 'questionset', component: QuestionsetComponent},
  {path: 'adminreview', component: AdminReviewComponent},
  {path: 'test-home', component: TestHomeComponent},
  {path: 'employee-profile', component: EmployeeProfileComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
