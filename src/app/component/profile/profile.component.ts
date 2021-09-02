import { Region } from './../../models/region';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from './../../../environments/environment';
import { AuthenticationService } from './../../shared/authentication.service';
import { UserFull } from './../../models/user-full';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: UserFull = new UserFull();

  hasErrorInfo: boolean = false;
  submittedInfo: boolean = false;

  info: FormGroup;

  nameFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  emailFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  telephoneFormControl: FormControl = new FormControl('', [
    Validators.pattern(/^([56]\d[2-9]\d{8})$/),
  ]);

  birthdayFormControl: FormControl = new FormControl('', []);


  imgProfile: any;
  imgShow: any;

  @ViewChild('fileupload')
  fileinput: ElementRef;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthenticationService
  ) {
    this.info = this.formBuilder.group({
      name: this.nameFormControl,
      telephone: this.telephoneFormControl,
      email: this.emailFormControl,
      birthday: this.birthdayFormControl
    });


    this.userService.profile().subscribe((response) => {
      if (response.state) {
        this.user = response.user;
        this.user.telephone = response.user.phone;
        if (this.user.img_profile != null) {
          this.imgShow = environment.urlApi + this.user.img_profile;
        }
        this.load();
      }
    });
  }

  load(): void {
    this.loadInfo();
  }

  loadInfo(): void {
    this.nameFormControl.setValue(this.user.name);
    this.emailFormControl.setValue(this.user.email);
    this.telephoneFormControl.setValue(this.user.telephone);
    this.birthdayFormControl.setValue(this.user.birthday);
  }



  submitInfo(): void {
    this.submittedInfo = true;
    this.hasErrorInfo = false;
    if (this.info.valid) {
      const userInfo: User = this.info.value;
      this.userService.updateProfile(userInfo).subscribe((response) => {
        this.submittedInfo = false;
        if (response.state) {
          this.user = response.user;
          this.user.telephone = response.user.phone;
          this.load();
          const userCurrent: User = this.authService.currentUserValue;
          userCurrent.name = this.user.name;
          userCurrent.email = this.user.email;
          this.authService.refreshUser(userCurrent);
        } else {
          this.hasErrorInfo = true;
        }
      });
    }
  }

  ngOnInit(): void {}

  fileChange(files: any) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgShow = reader.result;
    };
    this.imgProfile = files[0];
    const form = new FormData();
    form.append('img_profile', this.imgProfile);
    this.userService.imgProfile(form).subscribe((response) => {
      if (response.state) {
        this.user = response.user;
        this.user.telephone = response.user.phone;
        this.load();
        const userCurrent: User = this.authService.currentUserValue;
        userCurrent.img_profile = environment.urlApi + this.user.img_profile;
        this.authService.refreshUser(userCurrent);
      }
    });
  }

  closeAlert(op: number): void {
    switch (op) {
      case 1: //INFO
        this.hasErrorInfo = false;
        break;
    }
  }

}
