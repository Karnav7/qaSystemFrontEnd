import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatSidenavModule,
  MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule, MatTooltipModule, MatSortModule,
  MatSlideToggleModule, MatToolbarModule, MatListModule, MatGridListModule, MatSnackBarModule, MatPaginatorModule,
  MatCardModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule, MatTableModule, MatTabsModule, MatMenuModule,
  MatExpansionModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import 'hammerjs';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { QuestionsetComponent } from './questionset/questionset.component';
import { AdminReviewComponent } from './admin-review/admin-review.component';

import { AppRoutingModule } from './app-routing.module';

import { baseURL } from './shared/baseurl';
import { AuthService } from './services/auth.service';
import { ProcesshttpmsgService } from './services/processhttpmsg.service';
import { QuestionsetService } from './services/questionset.service';
import { TestService } from './services/test.service';

import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';
import { TestHomeComponent } from './test-home/test-home.component';
import { DialogReportCardComponent } from './test-home/dialog-report-card/dialog-report-card.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdminDashboardComponent,
    EmployeeDashboardComponent,
    QuestionsetComponent,
    AdminReviewComponent,
    TestHomeComponent,
    DialogReportCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatSidenavModule,
    MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule, MatTooltipModule, MatSortModule, MatMenuModule,
    MatSlideToggleModule, MatToolbarModule, MatListModule, MatGridListModule, MatSnackBarModule, MatPaginatorModule,
    MatCardModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule, MatTableModule, MatTabsModule, MatExpansionModule,
    FlexLayoutModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RestangularModule.forRoot(RestangularConfigFactory)
  ],
  entryComponents: [
    DialogReportCardComponent
  ],
  providers: [
    AuthService,
    ProcesshttpmsgService,
    QuestionsetService,
    TestService,
    { provide: 'BaseURL', useValue: baseURL}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
