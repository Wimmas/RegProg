import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  public formSubmitted = false;
  public correctDetails = false;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
    ]
  };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: FirebaseService,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }

  resetFields(){
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(form){
    if (!form.valid) {
      return;
    }
    this.firebaseService.loginUser(form.value.email, form.value.password)
    .forEach(
      res => {
        if(res.length > 0)
        {
          this.cookieService.set('Status','Logged In');

          this.correctDetails = true;
          this.resetFields();
          this.router.navigate(['/home']);
        }
        else
        {
          
        }
      }
    )

    this.formSubmitted = true;
  }
}
