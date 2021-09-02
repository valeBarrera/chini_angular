import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../../models/user';
import { AuthenticationService } from './../../shared/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isRegister: boolean = false;
  hasError: boolean = false;
  submitted: boolean = false;
  isExpirated: boolean = false;

  message: string = '';
  returnUrl: string = '';

  loginForm: FormGroup;

  emailFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(12),
    Validators.minLength(6),
  ]);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
    if (localStorage.getItem('message_register') !== null) {
      this.isRegister = true;
      this.message = localStorage.getItem('message_register');
      localStorage.removeItem('message_register');
    }
    this.isExpirated = localStorage.getItem('is_expirated') === 'true';
    localStorage.setItem('is_expirated', 'false');
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.emailFormControl,
      password: this.passwordFormControl,
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  closeAlert(type: number): void {
    switch (type) {
      case 1: //Register
        this.isRegister = false;
        break;
      case 2: //Error Submit
        this.hasError = false;
        break;
      case 3: //Session Expirated
        this.isExpirated = false;
        break;
    }
  }



  submit(): void {
    this.submitted = true;
    this.hasError = false;
    this.isExpirated = false;
    if (this.loginForm.valid) {
      const user: User = this.loginForm.value;
      this.authService
        .login(user.email, user.password)
        .pipe(first())
        .subscribe((response) => {
          if (response.state){
            this.router.navigate([this.returnUrl]);
          }else{
            this.hasError = true;
          }
        });
    }
  }
}
