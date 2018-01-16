import { Component, OnInit } from '@angular/core';
import {  MatDialog, MatDialogRef } from '@angular/material';

import { Test } from '../../shared/test';
import { QuestionSet } from '../../shared/questionset';
import { TestService } from '../../services/test.service';
import { QuestionsetService } from '../../services/questionset.service';

@Component({
  selector: 'app-dialog-report-card',
  templateUrl: './dialog-report-card.component.html',
  styleUrls: ['./dialog-report-card.component.scss']
})
export class DialogReportCardComponent implements OnInit {

  qset: QuestionSet;
  test: Test;

  constructor(
    private qsetService: QuestionsetService,
    private testService: TestService
  ) { }

  ngOnInit() {
    const qsetId = localStorage.getItem('qsetId');
    const testId = localStorage.getItem('testId');
    this.qsetService.getQuestionSetbyId(qsetId).subscribe(qset => {
      this.qset = qset;
      console.log('qset', this.qset);
    });
    this.testService.getTestbyId(testId).subscribe(test => {
      this.test = test;
      console.log('test', this.test);
    });
  }

}
