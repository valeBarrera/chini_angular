import { ImageType } from './../../models/image-type';
import { ElementState } from './../../models/element-state';
import { Category } from './../../models/category';
import { CharactCategory } from './../../models/charact-category';
import { CatProdService } from './../../services/cat-prod.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-caract-categoria',
  templateUrl: './agregar-caract-categoria.component.html',
  styleUrls: ['./agregar-caract-categoria.component.css'],
})
export class AgregarCaractCategoriaComponent implements OnInit {
  hasError: boolean = false;
  isSuccess: boolean = false;
  submitted: boolean = false;

  charactCatForm: FormGroup;

  categorys: Category[] = [];

  nameFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  descriptionFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  categoryIdFormControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  isCustomFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  isOptionalFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  isImageFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  isDesignFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  imageTypeIdFormControl: FormControl = new FormControl('', [
  ]);

  stateFormControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  states: ElementState[] = [];
  imageTypes: ImageType[] = [];

  priceFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(0)
  ]);

  constructor(
    private catProdService: CatProdService,
    private formBuilder: FormBuilder
  ) {
    this.charactCatForm = this.formBuilder.group({
      name: this.nameFormControl,
      description: this.descriptionFormControl,
      category_id: this.categoryIdFormControl,
      image_type_id: this.imageTypeIdFormControl,
      is_custom: this.isCustomFormControl,
      is_optional: this.isOptionalFormControl,
      is_image: this.isImageFormControl,
      is_design: this.isDesignFormControl,
      price: this.priceFormControl,
      state: this.stateFormControl
    });
    this.catProdService.currentCategory.subscribe(
      (x) => (this.categorys = x)
    );
    this.states = this.catProdService.allElementStates();
  }

  ngOnInit(): void {
    this.catProdService.allImageType().subscribe((response) => {
      if (response.state) {
        this.imageTypes = response.imageTypes;
      }
    });
    this.catProdService.allCategory().subscribe((response) => {
      if (response.state) {
        this.categorys = response.categorys;
      }
    });
    this.charactCatForm.reset();
    this.isCustomFormControl.setValue(false);
    this.isOptionalFormControl.setValue(false);
    this.isImageFormControl.setValue(false);
    this.isDesignFormControl.setValue(false);
    this.priceFormControl.setValue(0);
    this.stateFormControl.setValue(1);
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
    if (this.charactCatForm.valid) {
      const chrtCat: CharactCategory = this.charactCatForm.value;
      this.catProdService
        .createCharactCategory(chrtCat)
        .subscribe((response) => {
          this.submitted = false;
          if (response.state) {
            this.isSuccess = true;
            this.charactCatForm.reset();
            this.isCustomFormControl.setValue(false);
            this.isOptionalFormControl.setValue(false);
            this.isImageFormControl.setValue(false);
            this.isDesignFormControl.setValue(false);
            this.priceFormControl.setValue(0);
            this.stateFormControl.setValue(1);
          } else {
            this.hasError = true;
          }
        });
    }
  }

  clean(): void {
    this.charactCatForm.reset();
    this.isCustomFormControl.setValue(false);
    this.isOptionalFormControl.setValue(false);
    this.isImageFormControl.setValue(false);
    this.isDesignFormControl.setValue(false);
    this.priceFormControl.setValue(0);
    this.stateFormControl.setValue(1);
  }
}
