import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  
  public formSubmitted = false;

  validation_messages = {
    'name': [
      { type: 'required', message: 'First Name is required.' }
    ],
    'surname': [
      { type: 'required', message: 'Last Name is required.' }
    ],
    'idNum': [
      { type: 'required', message: 'ID Number is required.' },
    ],
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
    public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required ],
      surname: ['', Validators.required ],
      idNum: ['', Validators.required ],
      email: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }

  resetFields(){
    this.registerForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      idNum: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(form){
    this.formSubmitted = true;
    if (!form.valid) {
      return;
    }
    this.firebaseService.registerUser(form.value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/login']);
      }
    )
  }
}
