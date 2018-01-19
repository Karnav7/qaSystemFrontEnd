import { Component, OnInit } from '@angular/core';
import { MatSidenavModule, MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MatSnackBar,
  MatRadioChange, MatButtonToggleGroup, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader,
 MatExpansionPanelActionRow, MatAccordionDisplayMode, MatMenuTrigger, MatMenu, MatMenuItem, MatHint } from '@angular/material';

import { User } from '../shared/user';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { duration } from 'moment';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

  user: User;
  id: string;
  errMess: string;
  Username: string;
  EmailId: string;
  Contactno: number;
  NewPassword: string;
  ConfirmPassword: string;
  usernameError = false;
  usernameErrorName: string;
  emailidError: boolean;
  emailidErrorName: string;
  contactnoError: boolean;
  contactnoErrorName: string;
  passwordError = false;


  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.id = localStorage.getItem('Id');
    this.authService.getUserById(this.id).subscribe(user => {
      this.user = user;
      console.log('user', this.user);
    },
    errmess => {
      this.errMess = <any>errmess;
    });
  }

  onSubmitUsername() {
    if ( this.Username.length < 2 ) {
      this.usernameError = true;
      this.usernameErrorName = 'Username must contain atleast 2 characters';
    } else if ( this.Username.length > 2) {
      this.usernameError = false;
    }
    if ( this.usernameError === false) {
      this.user.username = this.Username.trim();
      this.profileService.updateUser(this.user, this.id).subscribe(user => {
        this.user = user;
        this.snackBar.open('Username changed successfully!', 'Ok', {
          duration: 3000
        });
      },
      errmess => {
        this.errMess = <any>errmess;
      });
    }
  }

  onSubmitEmailId() {
    this.user.email_id = this.EmailId.trim();
    this.profileService.updateUser(this.user, this.id).subscribe(user => {
      this.user = user;
      this.snackBar.open('Email id changed successfully!', 'Ok', {
        duration: 3000
      });
    },
    errmess => {
      this.errMess = <any>errmess;
    });
  }

  onSubmitContactno() {
    this.user.mobile_no = this.Contactno;
    this.profileService.updateUser(this.user, this.id).subscribe(user => {
      this.user = user;
      this.snackBar.open('Contact Number changed successfully!', 'Ok', {
        duration: 3000
      });
    },
    errmess => {
      this.errMess = <any>errmess;
    });
  }

  onSubmitPassword() {
    if ( (this.NewPassword === this.ConfirmPassword) && ((this.NewPassword.length <= 20) && (this.NewPassword.length >= 6)) ) {
      this.passwordError = false;
      console.log('testuser', this.user);
      this.user.password = this.NewPassword;
      this.profileService.updateUser(this.user, this.id).subscribe(user => {
        this.user = user;
        this.snackBar.open('Password changed successfully!', 'Ok', {
          duration: 3000
        });
      },
      errmess => {
        this.errMess = <any>errmess;
      });
    } else {
      this.passwordError = true;
    }
  }

}
