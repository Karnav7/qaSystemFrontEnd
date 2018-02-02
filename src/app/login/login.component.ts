import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { User } from '../shared/user';
import { baseURL } from '../shared/baseurl';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  //user: {username: '', password: ''};
  user: User;
  errMess: string;
  imageUrl: string;
  formErrors = {
    //'email': '',
    'username': '',
    'password': ''
  }

  validationMessages = {
    /*'email': {
      'required': 'Email is required.',
      'email': 'Email is not in valid format.'
    },*/
    'username': {
      'required': 'Please enter Username.'
    },
    'password': {
      'required': 'Please enter Password.'
    },
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public loginSnackBar: MatSnackBar
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.loginForm = this.fb.group({
      //email: ['', Validators.required, Validators.email],
      username: '',
      password: ''
    });

    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
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

  onSubmit() {
    this.user = this.loginForm.value;
    console.log("User: ", this.user);
    this.authService.logIn(this.user)
      .subscribe(res => {
        if(res.success){
          this.authService.isAuthenticated = true;
          //this.authService.storeUserCredentials(res.token);     //Login problem not able to store tokens
          this.authService.storeUserData(res.token, res.user, res.user._id);
          console.log("Login success", res);
          console.log(res.user);
          if(res.user.usertype === 'Admin') {
            this.router.navigate(['/admin-dashboard']).then(() => {
              this.loginSnackBar.open("Successfully logged in!", "Ok", {
                duration: 3000
              });
            });
          } else if (res.user.usertype === 'Employee') {
            this.router.navigate(['/employee-dashboard']).then(() => {
              this.loginSnackBar.open("Successfully logged in!", "Ok", {
                duration: 3000
              });
            });
          }
          // else {
          //   this.router.navigate(['/userdashboard']).then(() => {
          //     this.loginSnackBar.open("Successfully logged in!", "Ok", {
          //       duration: 3000
          //     });
          //   });
          // }
          //this.router.navigate(['/problemregister']);
        } else {
          console.log(res);
          this.router.navigate(['/login']).then(() => {
            this.loginSnackBar.open("Kindly correct Username or password!", "Ok", {
              duration: 3000
            });
          });
        }
        
      },
      error => {
        console.log(error);
        this.errMess = error;
        this.loginSnackBar.open("Kindly correct Username or password!", "Ok", {
          duration: 3000
        });
      });
  }

  onClickForgotPass() {
    this.router.navigate(['/reset-password']);
  }

}
