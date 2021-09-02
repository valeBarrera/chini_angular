import { Router } from '@angular/router';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  hasError: boolean = false;
  submitted: boolean =  false;

  registerForm: FormGroup;

  nameFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  emailFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(12),
    Validators.minLength(6),
  ]);

  confirmPasswordFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(12),
    Validators.minLength(6),
  ]);

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
    this.registerForm = this.fb.group(
      {
        name: this.nameFormControl,
        email: this.emailFormControl,
        password: this.passwordFormControl,
        confirmPassword: this.confirmPasswordFormControl,
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  ngOnInit(): void {}

  closeAlert(): void {
    this.hasError = false;
  }

  submit(): void {
    this.submitted = true;
    if (this.registerForm.valid){
      const user: User = this.registerForm.value;
      this.userService.register(user).subscribe((response) => {
        this.submitted = false;
        if (response.state) {
          this.registerForm.reset();
          localStorage.setItem('message_register', response.message);
          this.router.navigate(['/login']);
        }else{
          this.hasError = true;
        }
      });
    }
  }

  clear(): void{
    this.registerForm.reset();
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
