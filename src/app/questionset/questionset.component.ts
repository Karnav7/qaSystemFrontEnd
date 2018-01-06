import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSidenavModule, MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

import { QuestionSet, Question, Option, loc, dept, desig, isanswer } from '../shared/questionset';
// import { dept, desig, loc } from '../shared/user';
 import { QuestionsetService } from '../services/questionset.service';

@Component({
  selector: 'app-questionset',
  templateUrl: './questionset.component.html',
  styleUrls: ['./questionset.component.scss']
})
export class QuestionsetComponent implements OnInit {

  questionsets: QuestionSet[];
  questionset: QuestionSet;
  question: Question;
  questions: Question[];
  option: Option;
  options: Option[];
  questionsetForm: FormGroup;
  questionForm: FormGroup;
  optionForm: FormGroup;
  lOc = loc;
  Dept = dept;
  Desig = desig;
  IsAnswer = isanswer;

  qsetFormErrors = {
    'department': '',
    'designation': '',
    'location': ''
  };

  qsetValidationMessages = {
    'department': {
      'required': 'Kindly enter department.'
    },
    'designation': {
      'required': 'Kindly enter designation.'
    },
    'location': {
      'required': 'Kindly enter location.'
    }
  };

  qErrors ={
    'name': '',
    'marks': ''
  };

  qValidationMessages = {
    'name': {
      'required': 'Kindly enter question name'
    },
    'marks': {
      'required': 'Kindly enter marks',
      'maxlength': 'Marks cannot exceed more than 2 digits',
      'pattern': 'Only numbers are allowed'
    }
  };

  oErrors = {
    'name': ''
  };

  oValidationMessages = {
    'name': {
      'required': 'Kindly enter option name'
    }
  };

  // for errors
  errMess: string;

  constructor(
    private router: Router,
    // private questionsetService: QuestionsetService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar
  ) {
    this.createquestonsetForm();
    this.createquestionForm();
    this.createoptionForm();
  }

  ngOnInit() {
  }

  createquestonsetForm() {
    this.questionsetForm = this.fb.group({
      location: ['', [Validators.required]],
      department: ['', [Validators.required]],
      designation: ['', [Validators.required]]
    });

    this.questionsetForm.valueChanges.subscribe(qsetdata => this.qsetonValueChanged(qsetdata));
    this.qsetonValueChanged();
  }

  qsetonValueChanged(qsetdata?: any) {
    if (!this.questionsetForm) { return; }
    const form = this.questionsetForm;
    for (const field in this.qsetFormErrors) {
      // clear previous error message (if any)
      this.qsetFormErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.qsetValidationMessages[field];
        for (const key in control.errors) {
          this.qsetFormErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onQsetSubmit() {
    this.questionset = this.questionsetForm.value;
    console.log('questionset', this.questionset);
  }

  createquestionForm() {
    this.questionForm = this.fb.group({
      name: ['', [Validators.required]],
      marks: ['', [Validators.required, Validators.maxLength(2)]]
    });

    this.questionForm.valueChanges.subscribe(qdata => this.qonValueChanged(qdata));
    this.qonValueChanged();
  }

  qonValueChanged(qdata?: any) {
    if (!this.questionForm) { return; }
    const form = this.questionForm;
    for (const field in this.qErrors) {
      // clear previous error message (if any)
      this.qErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.qValidationMessages[field];
        for (const key in control.errors) {
          this.qErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onQuestionSubmit() {
    this.question = this.questionForm.value;
    console.log('question', this.question);
  }

  createoptionForm() {
    this.optionForm = this.fb.group({
      name: ['', [Validators.required]],
      isAnswer: ['']
    });

    this.optionForm.valueChanges.subscribe(odata => this.optiononValueChanged(odata));
    this.optiononValueChanged();
  }

  optiononValueChanged(odata?: any) {
    if (!this.optionForm) { return; }
    const form = this.optionForm;
    for (const field in this.oErrors) {
      // clear previous error message (if any)
      this.oErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.oValidationMessages[field];
        for (const key in control.errors) {
          this.oErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onoptionFormSubmit() {
    this.option = this.optionForm.value;
    console.log('Option', this.option);
  }

  dashboard() {
    this.router.navigate(['/admin-dashboard']);
  }

}
