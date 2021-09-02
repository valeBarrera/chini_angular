import { Brand } from './../../models/brand';
import { CatProdService } from './../../services/cat-prod.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-marca',
  templateUrl: './agregar-marca.component.html',
  styleUrls: ['./agregar-marca.component.css'],
})
export class AgregarMarcaComponent implements OnInit {
  hasError: boolean = false;
  isSuccess: boolean = false;
  submitted: boolean = false;

  brandForm: FormGroup;

  nameFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  descriptionFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  constructor(
    private catProdService: CatProdService,
    private formBuilder: FormBuilder
  ) {
    this.brandForm = this.formBuilder.group({
      name: this.nameFormControl,
      description: this.descriptionFormControl,
    });
  }

  ngOnInit(): void {}

  closeAlert(op: number): void {
    switch (op) {
      case 1:
        this.hasError = false;
        break;
      case 2:
        this.isSuccess = false;
        break;
    }
  }

  submit(): void {
    this.submitted = true;
    this.hasError = false;
    this.isSuccess = false;
    if (this.brandForm.valid) {
      const brand: Brand = this.brandForm.value;
      this.catProdService.createBrand(brand).subscribe((response) => {
        this.submitted = false;
        if (response.state) {
          this.isSuccess = true;
          this.brandForm.reset();
        } else {
          this.hasError = true;
        }
      });
    }
  }

  clean(): void {
    this.brandForm.reset();
  }
}
