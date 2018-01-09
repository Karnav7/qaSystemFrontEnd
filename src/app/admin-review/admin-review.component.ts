import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenavModule, MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

import { QuestionSet, Question, Option, loc, dept, desig, isanswer } from '../shared/questionset';
// import { dept, desig, loc } from '../shared/user';
 import { QuestionsetService } from '../services/questionset.service';

@Component({
  selector: 'app-admin-review',
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.scss']
})
export class AdminReviewComponent implements OnInit {

  questionsets: QuestionSet[];
  questionset: QuestionSet;
  question: Question;
  questions: Question[];
  option: Option;
  options: Option[];
  name = [];
  selectedValue: string;
  errMess: string;
  qno: number;
  // paginator input
  length: number;

  // table columns
  displayedColumns = ['name'];
  dataSource: MatTableDataSource<Question>;

  constructor(
    private router: Router,
    private questionsetService: QuestionsetService
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.questionsetService.getQuestionset().subscribe(qset => {
      console.log('qset', qset);
      this.questionsets = qset;
      for ( let i = 0; i < qset.length; i++) {
        console.log(this.questionsets[i].name);
        this.name[i] = {value: this.questionsets[i].name};
        console.log(this.name);
      }
    },
    errmess => {
      this.errMess = <any>errmess;
    });
    
    
  }

  onSubmit() {
    const name = this.selectedValue;
    this.questionsetService.getQuestionsetbyName(name).subscribe(questionset => {
      this.questionset = questionset;
      this.questions = this.questionset[0].questions;
      this.dataSource = new MatTableDataSource(this.questions);
      this.dataSource.paginator = this.paginator;
      this.length = this.questions.length;
      console.log(this.questionset[0].questions);
      console.log(this.questions);
      for( var i = 0; i < this.questions.length; i++) {
        this.options = this.questions[i].options;
        console.log('options', this.options);
      }
    },
    errmess => {
      this.errMess = <any>errmess;
    });
  }
 
  back() {
    this.router.navigate(['/questionset']);
  }

}
