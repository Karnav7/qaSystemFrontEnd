import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatSidenavModule, MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MatSnackBar, MatRadioChange, MatButtonToggleGroup } from '@angular/material';


import { User } from '../shared/user';
import { QuestionSet, Question, Option, loc, dept, desig, isanswer } from '../shared/questionset';
import { Test } from '../shared/test';
import { AuthService } from '../services/auth.service';
import { QuestionsetService } from '../services/questionset.service';
import { TestService } from '../services/test.service';
import { min } from 'moment';
import { query } from '@angular/animations/src/animation_metadata';

import { DialogReportCardComponent } from './dialog-report-card/dialog-report-card.component';

import { disableDebugTools } from '@angular/platform-browser/src/browser/tools/tools';
import { Router } from '@angular/router/src/router';

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
  testsession = new Test();

  name = [];                // used in select tag

  errMess: string;
  department: string;
  selectedValue: string;
  sum: number;              // for calculating total marks
  total_marks: number;
  test = false;

  // paginator input
  length: number;

  // table columns
  displayedColumns = ['name'];
  dataSource: MatTableDataSource<Question>;

  // timer
  minutes: number;
  seconds: number;

  // disabled: boolean;
  selectedOption: object;
  // selectedOptions = [];
  selected = false;

  stoptest: boolean;

  mode = 'test';               // for displaying test q&o during test session
  disabled = false;

  timer: string;
  i: number;

  constructor(
    private authService: AuthService,
    private qsetService: QuestionsetService,
    private testService: TestService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    
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
      this.total_marks = this.sum;
    },
    errmess => {
      this.errMess = <any>errmess;
    });
  }

  onStart() {
    this.stoptest = false;
    this.test = true;
    

    let mins = this.qset[0].test_duration;
    let seconds = 0;
    const k = setInterval(() => {
      seconds = seconds - 1;
      if ( seconds < 0) {
        seconds = 59;
        mins = mins - 1;
      }
      console.log('mins: ', mins);
      // document.getElementById('demo').innerHTML = mins + 'm ' + seconds + 's';
      this.timer = mins + 'm ' + seconds + 's';
      if ( this.stoptest === true ) {
        mins = -1;
      }
      if ( mins < 0 ) {
        clearInterval(k);
        // document.getElementById('demo').innerHTML = 'EXPIRED';
        this.timer = 'EXPIRED';
        this.onSubmitTest();
      }
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

  onSelectionChange(question: Question, option: Option) {
    // console.log('ans', s);
    // s.isSelected = true;
    // console.log('test', s);
    this.selectedOption = option;
    option.isSelected = true;
    question.answered = true;
    question.options.forEach((x) => {if (x._id !== option._id) {x.isSelected = false;}});
    console.log(this.selectedOption);
    // this.selectedOptions.push(s);
    // console.log(this.selectedOptions);
    console.log('question', question);
  }

  // onSelect(questions: Question, option: Option) {
  //   questions.options.forEach((x) => {if (x._id === option._id) {x.isSelected = true;}});
  //   console.log('question', questions);
  //   console.log('option', option);
    
  
  // }

  onSubmitTest() {
    let answers = [];
    let score = 0;
    this.qset[0].questions.forEach(x => {
      answers.push({'uid': this.user._id, 'qsetId': this.qset[0]._id, 'qid': x._id, 'answered': x.answered});
      console.log('marks',x.marks);
      
      x.options.forEach(y => {
        console.log('selected', y.isSelected);
        if ( (y.isSelected && y.isAnswer) === true ) {
          score = score + x.marks;

          return score;
        }
      });
    });

    console.log(this.qset[0].questions);
    console.log(answers);
    console.log('score', score);
    this.testsession.duration = this.qset[0].test_duration;
    this.testsession.uId = this.user._id;
    this.testsession.qsetId = this.qset[0]._id;
    this.testsession.marks_scored = score;
    this.testsession.total_marks = this.total_marks;
    console.log('test', this.testsession);
    // this.testService.postTest(this.testsession).subscribe(test => {
    //   this.testsession = test;
    //   localStorage.setItem('testId', test._id);
    //   console.log('stored in server', this.testsession);
    //   this.snackBar.open('Test submitted successfully!', 'Ok', {
    //     duration: 2000
    //   });
    // },
    // errmess => {
    //   this.errMess = <any>errmess;
    //   this.snackBar.open('Error: ' + this.errMess + 'Kindly resubmit test!', 'Ok', {
    //     duration: 3000
    //   });
    // });
    this.mode = 'result';
    this.disabled = true;
    console.log('mode', this.mode);
  }

  isCorrect(question: Question) {
    return question.options.every(x => x.isSelected === x.isAnswer) ? 'correct' : 'wrong';
  }

  onClickScoreCard(qsetId): void {
    const dialogRef = this.dialog.open(DialogReportCardComponent, {
      width: '500px',
    });
    console.log('qsetId', qsetId);
    localStorage.setItem('qsetId', qsetId);
  }

  onStop() {
    this.test = false;
    this.stoptest = true;
    this.mode = 'test';
  }

  

}
