import { Component, OnInit } from '@angular/core';
import { MatSidenavModule, MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MatSnackBar,
  MatRadioChange, MatButtonToggleGroup, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader,
 MatExpansionPanelActionRow, MatAccordionDisplayMode, MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material';

import { User } from '../shared/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

  user: User;
  errMess: string;
  Username: string;
  EmailId: string;
  Contactno: number;
  NewPassword: string;
  ConfirmPassword: string;

  formErrors = {
    'username': '',
    'email_id': '',
    'mob_no': ''
  };

  validationMessages = {
    'username': {
      'minlength': 'Username must be atleast 2 characters.',
      'maxlength': 'Username must not exceed more than 20 characters.'
    },
    'email_id': {
      'email': 'Email id is not in valid format.'
    },
    'mob_no': {
      'pattern': 'Mobile number must contain only numbers.',
      'minlength': 'Mobile number must be atleast 10 digits.',
      'maxlength': 'Mobile number must not exceed more than 10 digits'
    }
  };

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    const id = localStorage.getItem('Id');
    this.authService.getUserById(id).subscribe(user => {
      this.user = user;
      console.log('user', this.user);
    },
    errmess => {
      this.errMess = <any>errmess;
    });
  }

  onUsernameValueChanged(data?: any) {
    if (!this.Username) { return; }
    const form = this.Username;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
