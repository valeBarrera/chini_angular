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

import * as regData from '../../regiones.json';

@Component({
  selector: 'app-profile-shop',
  templateUrl: './profile-shop.component.html',
  styleUrls: ['./profile-shop.component.css'],
})
export class ProfileShopComponent implements OnInit {
  user: UserFull = new UserFull();

  regionesJson: any = (regData as any).default;

  hasErrorInfo: boolean = false;
  submittedInfo: boolean = false;

  hasErrorDireccion: boolean = false;
  submittedDireccion: boolean = false;

  hasErrorCambioPass: boolean = false;
  submittedCambioPass: boolean = false;

  regions: Region[] = this.regionesJson;
  citys: string[] = [];

  info: FormGroup;
  direccion: FormGroup;
  passwords: FormGroup;

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

  addressFormControl: FormControl = new FormControl('', [Validators.required]);

  cityFormControl: FormControl = new FormControl('', [Validators.required]);

  regionFormControl: FormControl = new FormControl('', [Validators.required]);

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

  imgProfile: any;
  imgShow: any;

  @ViewChild('fileupload')
  fileinput: ElementRef;

  INFO: number = 1;
  DIRECCION: number = 2;
  CAMBIOPASS: number = 3;
  COMPRAS: number = 4;

  active: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthenticationService
  ) {
    this.info = this.formBuilder.group({
      name: this.nameFormControl,
      telephone: this.telephoneFormControl,
      email: this.emailFormControl,
      birthday: this.birthdayFormControl,
    });

    this.passwords = this.formBuilder.group({
      current_password: this.currentPasswordFormControl,
      new_password: this.newPasswordFormControl,
      confirm_password: this.confirmPasswordFormControl,
    });

    this.direccion = this.formBuilder.group({
      address: this.addressFormControl,
      city: this.cityFormControl,
      region: this.regionFormControl,
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
    this.loadRegion();
  }

  loadInfo(): void {
    this.nameFormControl.setValue(this.user.name);
    this.emailFormControl.setValue(this.user.email);
    this.telephoneFormControl.setValue(this.user.telephone);
    this.birthdayFormControl.setValue(this.user.birthday);
  }

  loadRegion(): void {
    this.addressFormControl.setValue(this.user.address);
    this.regionFormControl.setValue(this.user.region);
    this.changeRegion();
    this.cityFormControl.setValue(this.user.city);
  }

  changeRegion(): void {
    if (this.regionFormControl.value != 'null') {
      this.regions.forEach((reg) => {
        if (reg.region === this.regionFormControl.value) {
          this.citys = reg.comunas;
        }
      });
    }
  }

  submitDireccion(): void {
    this.submittedDireccion = true;
    this.hasErrorDireccion = false;
    if (this.direccion.valid) {
      const userAddress: User = this.direccion.value;
      this.userService.updateAddress(userAddress).subscribe((response) => {
        this.submittedDireccion = false;
        if (response.state) {
          this.user = response.user;
          this.user.telephone = response.user.phone;
          this.load();
        } else {
          this.hasErrorDireccion = true;
        }
      });
    }
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
      case 2: //DIRECCION
        this.hasErrorDireccion = false;
        break;
    }
  }

  cambio(op: number): void {
    switch (op) {
      case this.INFO:
        this.active = this.INFO;
        break;
      case this.DIRECCION:
        this.active = this.DIRECCION;
        break;
      case this.CAMBIOPASS:
        this.active = this.CAMBIOPASS;
        break;
      case this.COMPRAS:
        this.active = this.COMPRAS;
        break;
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
