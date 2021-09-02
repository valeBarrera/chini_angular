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
  selector: 'app-profile-address',
  templateUrl: './profile-address.component.html',
  styleUrls: ['./profile-address.component.css'],
})
export class ProfileAddressComponent implements OnInit {
  user: UserFull = new UserFull();

  regionesJson: any = (regData as any).default;

  hasErrorDireccion: boolean = false;
  submittedDireccion: boolean = false;

  regions: Region[] = this.regionesJson;
  citys: string[] = [];

  direccion: FormGroup;

  addressFormControl: FormControl = new FormControl('', [Validators.required]);

  cityFormControl: FormControl = new FormControl('', [Validators.required]);

  regionFormControl: FormControl = new FormControl('', [Validators.required]);


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthenticationService
  ) {

    this.direccion = this.formBuilder.group({
      address: this.addressFormControl,
      city: this.cityFormControl,
      region: this.regionFormControl,
    });

    this.userService.profile().subscribe((response) => {
      if (response.state) {
        this.user = response.user;
        this.user.telephone = response.user.phone;
        this.load();
      }
    });
  }

  load(): void {
    this.loadRegion();
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



  ngOnInit(): void {}


  closeAlert(op: number): void {
    switch (op) {
      case 2: //DIRECCION
        this.hasErrorDireccion = false;
        break;
    }
  }

}
