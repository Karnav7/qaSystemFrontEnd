import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSidenavModule, MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { User, user_role, dept, desig, loc } from '../shared/user';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  user = new User();
  users: User[];
  signupForm: FormGroup;
  userRole = user_role;
  Dept = dept;
  Desig = desig;
  lOc = loc;
  dob: Date;
  // user.usertype = 'Employee';
  // selectedValueDept = 'Software';
  // selectedValueDesig = 'Engineer';
 
  formErrors = {
    'firstname': '',
    'lastname': '',
    'mobile_no': '',
    'email_id': '',
    'username': '',
    // 'password': '',
    'location': '',
    'designation': '',
    'department': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First name is required.'
    },
    'lastname': {
      'required': 'Last name is required.'
    },
    'mobile_no': {
      'pattern': 'Mobile number must contain only numbers.',
      'minlength': 'Mobile number must be atleast 10 digits.',
      'maxlength': 'Mobile number must not exceed more than 10 digits'
    },
    'email_id': {
      'required': 'Email id is required.',
      'email': 'Email id is not in valid format.'
    },
    'username': {
      'required': 'Kindly enter Username.',
      'minlength': 'Username must be atleast 2 characters.',
      'maxlength': 'Username must not exceed more than 20 characters.'
    },
    // 'password': {
    //   'required': 'Kindly enter Password.',
    //   'minlength': 'Password must be atleast 3 characters.',
    //   'maxlength': 'Password must not exceed more than 25 characters.'
    // },
    'location': {
      'required': 'Kindly enter Location.'
    },
    'designation': {
      'required': 'Kindly enter Designation.'
    },
    'department': {
      'required': 'Kindly enter Department.'
    }
  };

  // for errors
  errMess: string;

  // paginator input
  length: number;
  
  // table columns
  displayedColumns = ['username', 'firstname', 'lastname', 'userrole', 'actions'];
  dataSource: MatTableDataSource<User>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.authService.getUsers().subscribe(users => {
      this.users = users;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.length = this.users.length;
      console.log(this.users);
    }, errmess => {
      this.errMess = errmess;
      this.snackBar.open("Something went wrong!", "Ok", {
        duration: 2000
      });
    });
  }

  createForm() {
    this.signupForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      // password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      mobile_no: ['', [Validators.pattern, Validators.minLength(10), Validators.maxLength(10)]],
      email_id: [{value: '', disabled: false}, [Validators.email, Validators.required]],
      dob: [''],
      usertype: [''],
      location: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      department: ['', [Validators.required]]
    });

    this.signupForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.signupForm) { return; }
    const form = this.signupForm;
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
    
    this.user = this.signupForm.value;
    console.log(this.user);
    this.authService.signUp(this.user).subscribe(res => {
      if (res.success) {
          this.snackBar.open("Successfully signed up!", "Ok", {
            duration: 2000
          });
          this.signupForm.reset();
          this.authService.getUsers().subscribe(users => {
            this.users = users;
            this.dataSource = new MatTableDataSource(this.users);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.length = this.users.length;
            console.log(this.users);
          }, errmess => {
            this.errMess = errmess;
            this.snackBar.open("Something went wrong!", "Ok", {
              duration: 2000
            });
          });
     
      } else {
        this.router.navigate(['/signup']).then(() => {
          this.snackBar.open("Sign up failed, Kindly sign up again!", "Ok", {
            duration: 3000
          });
        });
      }
    });
  }

  onDelete(id: string) {
    this.authService.deleteUser(id).subscribe(user =>{
      if(user) {
        console.log(user);
        this.authService.getUsers().subscribe(users => {
          this.users = users;
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.length = this.users.length;
          console.log(this.user);
          this.snackBar.open("The User is deleted successfully!", "Ok", {
            duration: 2000
          });
        },
        errmess => {
          this.errMess = <any>errmess;
          this.snackBar.open("Couldn't delete User!", "Ok", {
            duration: 2000
          });
        });
      }
    },
    errmess => {
      this.errMess = <any>errmess;
      this.snackBar.open("Something went wrong!", "Ok", {
        duration: 2000
      });
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  questionset() {
    this.router.navigate(['/questionset']);
  }

}
