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
    'name': '',
    'department': '',
    'designation': '',
    'location': ''
  };

  qsetValidationMessages = {
    'name': {
      'required': 'Kindly enter name.'
    },
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
    public snackBar: MatSnackBar,
    private questionsetService: QuestionsetService
  ) {
    this.createquestonsetForm();
    this.createquestionForm();
    this.createoptionForm();
  }

  ngOnInit() {
  }

  createquestonsetForm() {
    this.questionsetForm = this.fb.group({
      name: ['', [Validators.required]],
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

    this.questionsetService.postQuestionSet(this.questionset).subscribe(qset => {
      console.log('qset', qset);
      localStorage.setItem('qset', qset._id);
      // localStorage.setItem('qset_temp', qset._id);
      this.snackBar.open(qset.name + ' saved successfully!', 'Ok', {
        duration: 2000
      });
    },
    errmess => {
      this.errMess = <any>errmess;
    });
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

    const qsetid = localStorage.getItem('qset');
    if (qsetid) {
      this.questionsetService.postQuestion(this.question, qsetid).subscribe(question => {
        console.log('question', question);
        const x = question.questions.length;
        console.log('length', x);
        localStorage.setItem('qId', question.questions[question.questions.length - 1]._id);
        // localStorage.setItem('qId_temp', question.questions[0]._id);
        this.snackBar.open('Question added successfully to Question set!', 'Ok', {
          duration: 2000
        });
      },
      errmess => {
        this.errMess = <any>errmess;
      });
    } else {
      this.snackBar.open('If you want to add more questions then click add button on Qustionset card', 'ok', {
        duration: 5000
      });
    }


  }

  // Stop adding more questions in question set
  onQFinish() {
    localStorage.removeItem('qsetId');
  }

  // Adding questions in question set
  onQAdd() {
    // const y = localStorage.getItem('qsetId');
    // if ( y === null) {
    //   const x = localStorage.getItem('qsetId_temp');
    //   localStorage.setItem('qsetId', x);
    //   this.snackBar.open('Now start adding questions in question section', 'Ok', {
    //     duration: 2000
    //   });
    // } else {
    //   this.snackBar.open('No need to click on add button, continue adding questions', 'Ok', {
    //     duration: 3000
    //   });
    // }

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

    const qsetid = localStorage.getItem('qset');
    const qid = localStorage.getItem('qId');

    if (qsetid !== null && qid !== null) {
      this.questionsetService.postOption(this.option, qsetid, qid).subscribe(option => {
        console.log('option', option);
        localStorage.setItem('oId', option.questions[0].options[0]._id);
        this.snackBar.open('Option added successfully to question!', 'Ok', {
          duration: 2000
        });
      },
      errmess => {
        this.errMess = <any>errmess;
      });
    } else if (qsetid === null && qid !== null) {
      this.snackBar.open('If you want to add more options then click add button on Qustionset card', 'ok', {
        duration: 5000
      });
    } else if (qsetid !== null && qid === null) {
      this.snackBar.open('If you want to add more options then click add button on Question card', 'ok', {
        duration: 5000
      });
    } else {
      this.snackBar.open('If you want to add more options then click add button on Qustionset card and Question card', 'ok', {
        duration: 5000
      });
    }
    
  }

  // Stop adding more options in a question
  onOFinish() {
    // localStorage.removeItem('qId');
  }

  // continue adding more options in a question
  onOAdd() {
    // if ( localStorage.getItem('qId') === null ) {
    //   const x = localStorage.getItem('qId_temp');
    //   localStorage.setItem('qId', x);
    //   this.snackBar.open('Now start adding options in option section', 'Ok', {
    //     duration: 2000
    //   });
    // } else {
    //   this.snackBar.open('No need to click on add button, continue adding options', 'Ok', {
    //     duration: 3000
    //   });
    // }
  }

  review() {
    this.router.navigate(['/adminreview']);
  }
  
  dashboard() {
    this.router.navigate(['/admin-dashboard']);
  }

}
