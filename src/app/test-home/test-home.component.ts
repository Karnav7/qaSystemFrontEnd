import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatSidenavModule, MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MatSnackBar, MatRadioChange } from '@angular/material';

import { User } from '../shared/user';
import { QuestionSet, Question, Option, loc, dept, desig, isanswer } from '../shared/questionset';
import { AuthService } from '../services/auth.service';
import { QuestionsetService } from '../services/questionset.service';
import { min } from 'moment';

@Component({
  selector: 'app-test-home',
  templateUrl: './test-home.component.html',
  styleUrls: ['./test-home.component.scss']
})
export class TestHomeComponent implements OnInit {

  user: User;
  qsets: QuestionSet[];
  qset: QuestionSet;
  question: Question;
  questions: Question[];
  option: Option;
  options: Option[];

  name = [];                // used in select tag

  errMess: string;
  department: string;
  selectedValue: string;
  sum: number;              // for calculating total marks
  test = false;

  // paginator input
  length: number;

  // table columns
  displayedColumns = ['name'];
  dataSource: MatTableDataSource<Question>;

  // timer
  minutes: number;
  seconds: number;

  disabled: boolean;
  selectedOption: object;
  selectedOptions = [];

  constructor(
    private authService: AuthService,
    private qsetService: QuestionsetService
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // @Output()
  // change: EventEmitter<MatRadioChange>;

  ngOnInit() {
    const id = localStorage.getItem('Id');
    console.log('id', id);
    this.authService.getUserById(id).subscribe(user => {
      this.user = user;
      console.log(this.user);

      this.department = this.user.department;
      console.log('department', this.department);

      this.qsetService.getQuestionSetbyDepartment(this.department).subscribe(qsets => {
        this.qsets = qsets;
        console.log('qset', this.qsets);

        for ( let i = 0; i < qsets.length; i++) {
          console.log(this.qsets[i].name);
          this.name[i] = {value: this.qsets[i].name};
          console.log(this.name);
        }
      },
      errmess => {
        this.errMess = <any>errmess;
      });
    },
    errmess => {
      this.errMess = <any>errmess;
    });


  }

  onSubmit() {
    const name = this.selectedValue;
    this.sum = 0;
    this.qsetService.getQuestionsetbyName(name).subscribe(qset => {
      this.qset = qset;
      console.log(this.qset);
      this.questions = this.qset[0].questions;
      // this.dataSource = new MatTableDataSource(this.questions);
      // this.dataSource.paginator = this.paginator;
      // this.length = this.questions.length;
      console.log(this.qset[0].questions);
      console.log(this.questions);
      for ( let i = 0; i < this.questions.length; i++) {
        this.options = this.questions[i].options;
        console.log('options', this.options);

        this.sum += this.questions[i].marks;
      }
      console.log('sum', this.sum);
    },
    errmess => {
      this.errMess = <any>errmess;
    });
  }

  onStart() {
    this.test = true;

    

    let counter = 0;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    const k = setInterval(function() {
      counter = counter + 1;
      seconds = seconds + 1;
      if (seconds > 59) {
        seconds = 0;
        minutes += 1;
      }

      if (minutes > 59) {
        minutes = 0;
        hours += 1;
      }

      // if (seconds === 59 ) {
      //   minutes = minutes - 1;
      // }

      // if ((seconds % 60) === 0)  {
      //   minutes = minutes - 1;
      //   seconds = 0;
      // }
      document.getElementById('demo').innerHTML = minutes + 'm ' + seconds + 's ';

      // if ( minutes === 0 && seconds === 0 ) {
        
        if ( counter === 1800 ){
          clearInterval(k);
          document.getElementById('demo').innerHTML = 'EXPIRED';
        }
      // }
    }, 1000);

    const name = this.selectedValue;
    this.sum = 0;
    this.qsetService.getQuestionsetbyName(name).subscribe(qset => {
      this.qset = qset;
      console.log(this.qset);
      this.questions = this.qset[0].questions;
      this.dataSource = new MatTableDataSource(this.questions);
      this.dataSource.paginator = this.paginator;
      this.length = this.questions.length;
      console.log(this.qset[0].questions);
      console.log(this.questions);
      for ( let i = 0; i < this.questions.length; i++) {
        this.options = this.questions[i].options;
        console.log('options', this.options);
      }
    },
    errmess => {
      this.errMess = <any>errmess;
    });
  }

  onSelectionChange(s) {
    // console.log('ans', s);
    // s.isSelected = true;
    // console.log('test', s);
    this.selectedOption = s;
    console.log(this.selectedOption);
    this.selectedOptions.push(s);
    console.log(this.selectedOptions);
  }

  onStop() {
    this.test = false;
  }

}
