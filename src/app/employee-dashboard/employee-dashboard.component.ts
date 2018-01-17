import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavModule, MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MatSnackBar,
         MatRadioChange, MatButtonToggleGroup, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader,
        MatExpansionPanelActionRow, MatAccordionDisplayMode, MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material';

import { User } from '../shared/user';
import { QuestionSet, Question, Option, loc, dept, desig, isanswer } from '../shared/questionset';
import { Test } from '../shared/test';
import { AuthService } from '../services/auth.service';
import { QuestionsetService } from '../services/questionset.service';
import { TestService } from '../services/test.service';
// import { CountDown } from 'angular2-simple-countdown/countdown';
// import * as moment from 'moment';
// import * as yo from 'moment-timer';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {

  // countdownTime: Date = new Date();
  // x: Date = new Date();

  user: User;
  qsets: QuestionSet[];
  qset: QuestionSet;
  question: Question;
  questions: Question[];
  option: Option;
  options: Option[];
  tests: Test[];

  // paginator input
  length: number;
  
  // table columns
  displayedColumns = ['Previous Test Results'];
  dataSource: MatTableDataSource<Test>;

  errMess: string;
  step = 0;

  constructor(
    private testService: TestService
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    const uId: string = localStorage.getItem('Id');
    // to remove double quotes in ID
    const Uid: string = uId.substr(1);
    const uid: string = Uid.slice(0, -1);
    this.testService.getTestbyUid(uid).subscribe(tests => {
      this.tests = tests;
      console.log(this.tests);
      this.dataSource = new MatTableDataSource(this.tests);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.length = this.tests.length;
    },
    errmess => {
      this.errMess = <any>errmess;
    });
  }

  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
