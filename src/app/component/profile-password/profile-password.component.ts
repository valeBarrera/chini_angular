import { Region } from './../../models/region';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { environment } from './../../../environments/environment';
import { AuthenticationService } from './../../shared/authentication.service';
import { UserFull } from './../../models/user-full';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.css'],
})
export class ProfilePasswordComponent implements OnInit {
  user: UserFull = new UserFull();

  hasErrorCambioPass: boolean = false;
  submittedCambioPass: boolean = false;

  passwords: FormGroup;

  currentPasswordFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(12),
    Validators.minLength(6),
  ]);

  newPasswordFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(12),
    Validators.minLength(6),
  ]);

  confirmPasswordFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(12),
    Validators.minLength(6),
  ]);


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthenticationService
  ) {


    this.passwords = this.formBuilder.group({
      current_password: this.currentPasswordFormControl,
      new_password: this.newPasswordFormControl,
      confirm_password: this.confirmPasswordFormControl,
    });
    this.userService.profile().subscribe((response) => {
      if (response.state) {
        this.user = response.user;
        this.user.telephone = response.user.phone;
      }
    });
  }

  ngOnInit(): void {}


  closeAlert(op: number): void {
    switch (op) {

    }
  }
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
