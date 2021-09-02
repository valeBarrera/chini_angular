import { ImageSide } from './../../models/image-side';
import { ImageType } from './../../models/image-type';
import { CatProdService } from './../../services/cat-prod.service';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-tipo-imagen',
  templateUrl: './agregar-tipo-imagen.component.html',
  styleUrls: ['./agregar-tipo-imagen.component.css']
})
export class AgregarTipoImagenComponent implements OnInit {

  hasError: boolean = false;
  isSuccess: boolean = false;
  submitted: boolean = false;

  imageTypeForm: FormGroup;

  nameFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  descriptionFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  extraPriceFormControl: FormControl = new FormControl('', [
    Validators.min(0),
  ]);

  imageSideIdFormControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  imageSides: ImageSide[] = [];

  constructor(
    private catProdService: CatProdService,
    private formBuilder: FormBuilder
  ) {
    this.imageTypeForm = this.formBuilder.group({
      name: this.nameFormControl,
      description: this.descriptionFormControl,
      extra_price: this.extraPriceFormControl,
      image_side_id: this.imageSideIdFormControl
    });
  }

  ngOnInit(): void {
    this.extraPriceFormControl.setValue(0);
    this.catProdService.allImageSide().subscribe((response) => {
      if (response.state) {
        this.imageSides = response.imageSides;
      }
    });
  }

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
    if (this.imageTypeForm.valid) {
      const imgType: ImageType = this.imageTypeForm.value;
      this.catProdService.createImageType(imgType).subscribe((response) => {
        this.submitted = false;
        if (response.state) {
          this.isSuccess = true;
          this.imageTypeForm.reset();
          this.extraPriceFormControl.setValue(0);
        } else {
          this.hasError = true;
        }
      });
    }
  }

  clean(): void {
    this.imageTypeForm.reset();
    this.extraPriceFormControl.setValue(0);
  }


}
