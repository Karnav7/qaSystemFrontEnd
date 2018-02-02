import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { User } from '../shared/user';
import { PassResetCode } from '../shared/passresetcode';
import { Mail } from '../shared/mail';
import { baseURL } from '../shared/baseurl';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { empty } from 'rxjs/observable/empty';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  user: User[];
  code: PassResetCode;
  mail = new Mail();
  emailId: string;
  errMess: string;
  Code: string;
  NewPassword: string;
  ConfirmPassword: string;
  disable = true;
  passwordbtndisable = true;
  passwordHint = true;
  verificationcodeHint = true;
  verificationCodeDisable = true;
  showpassword = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.snackBar.open('Kindly enter your registered Email Id', 'Ok', {
      duration: 5000
    });
  }

  onSubmitEmailId() {
    const emailid = this.emailId.trim();
    console.log(emailid);
    this.authService.findEmailId(emailid).subscribe(user => {
      this.verificationCodeDisable = false;
      this.user = user;
      console.log('user', this.user);
      if (user.length !== 0) {
        console.log('1');
        this.authService.genPassResetCode(this.code).subscribe(code => {
          this.code = code;
          console.log('code', this.code.code);
          this.mail.subject = 'Request for password reset.';
          this.mail.message = 'Hey ' + this.user[0].username + ', your Feedback System password can be reset by entering this code: ' + this.code.code + '. If you did not request a new password, please ignore this email.';
          // incase code is unused after generating it, after 30 mins code will be deleted from database
          setTimeout(() => {
            this.authService.deleteVerificationCode();
          }, 1800000);
          // code is sent via mail to user
          this.authService.sendMail(this.user[0], this.mail).subscribe(data => {
            // console.log("Mail", data);
            this.snackBar.open('We have sent code to reset your password to ' + this.user[0].email_id + ', please check both your inbox and spam folder.', 'Ok');
            
          },
          error => {
            // console.log(error.status, error.message);
            this.snackBar.open("Failed to send mail", "Ok", {
              duration: 3000
            });
          });
        },
        errmess => {
          this.errMess = <any>errmess;
        });
        // Incase user dont recieve verification code on their registered email address
        setTimeout(() => {
          let codeSnackbar = this.snackBar.open('Did not receive code?', 'Resend it');
          codeSnackbar.onAction().subscribe(() => {
            console.log('Acition was triggered');
            this.authService.deleteVerificationCode();
            this.code = new PassResetCode();
            this.authService.genPassResetCode(this.code).subscribe(code => {
              this.code = code;
              console.log('code', this.code.code);
              this.mail.subject = 'Request for password reset.';
              this.mail.message = 'Hey ' + this.user[0].username + ', your Feedback System password can be reset by entering this code: ' + this.code.code + '. If you did not request a new password, please ignore this email.';
              this.authService.sendMail(this.user[0], this.mail).subscribe(data => {
                // console.log("Mail", data);
                this.snackBar.open('We have sent code to reset your password to ' + this.user[0].email_id + ', please check both your inbox and spam folder.', 'Ok');
                
              },
              error => {
                // console.log(error.status, error.message);
                this.snackBar.open("Failed to send mail", "Ok", {
                  duration: 3000
                });
              });
            },
            errmess => {
              this.errMess = <any>errmess;
            });
          });
        }, 5000);
      } else if ( user.length === 0 ) {
        console.log('2');
        this.snackBar.open('Kindly enter your registered Email Id!', 'Ok');
      }
    });
  }

  onSubmitCode() {
    this.authService.getVerificationCode().subscribe(code => {
      this.code = code;
      console.log('code', this.code);
    });
    if ( this.code.code === this.Code ) {
      this.verificationcodeHint = true;
      console.log('yo Biatch');
      this.disable = false;
      this.passwordbtndisable = false;
    } else {
      this.verificationcodeHint = false;
      // Incase user wants code again after not able to enter correct code
      let codeSnackbar = this.snackBar.open('Did not receive code?', 'Resend it');
      codeSnackbar.onAction().subscribe(() => {
        console.log('Acition was triggered');
        this.authService.deleteVerificationCode();
        this.code = new PassResetCode();
        this.authService.genPassResetCode(this.code).subscribe(code => {
          this.code = code;
          console.log('code', this.code.code);
          this.mail.subject = 'Request for password reset.';
          this.mail.message = 'Hey ' + this.user[0].username + ', your Feedback System password can be reset by entering this code: ' + this.code.code + '. If you did not request a new password, please ignore this email.';
          this.authService.sendMail(this.user[0], this.mail).subscribe(data => {
                // console.log("Mail", data);
            this.snackBar.open('We have sent code to reset your password to ' + this.user[0].email_id + ', please check both your inbox and spam folder.', 'Ok');
                
          },
          error => {
                // console.log(error.status, error.message);
            this.snackBar.open("Failed to send mail", "Ok", {
              duration: 3000
            });
          });
        },
        errmess => {
          this.errMess = <any>errmess;
        });
      });
    }
  }

  onSubmitPassword() {
    if ( this.NewPassword.trim() === this.ConfirmPassword.trim() ) {
      this.passwordHint = true;
      console.log('password matched');
      this.user[0].password = this.NewPassword.trim();
      console.log('updatedpassword', this.user[0]);
      const uId = this.user[0]._id;
      this.authService.updateUser(uId, this.user[0]).subscribe(user => {
        this.user[0] = user;
        console.log('uspdateduser', this.user[0]);
        this.authService.deleteVerificationCode();
        this.snackBar.open('Password has been successfully updated!', 'Ok', {
          duration: 3000
        });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3001);
      });
    } else {
      this.passwordHint = false;
    }
  }

  onClickVisibilityIcon() {
    this.showpassword = !this.showpassword;
  }

}
