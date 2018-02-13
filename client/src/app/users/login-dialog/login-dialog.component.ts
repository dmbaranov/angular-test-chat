import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  userLoginForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, private fb: FormBuilder) {
    this.userLoginForm = fb.group({
      username: ''
    });
  }

  ngOnInit() {}

  submitForm(values: object): void {
    this.dialogRef.close(values);
  }
}
