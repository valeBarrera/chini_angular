import { DesingLeaf } from './../../models/desing-leaf';
import { ElementState } from './../../models/element-state';
import { Category } from './../../models/category';
import { CharactCategory } from './../../models/charact-category';
import { CatProdService } from './../../services/cat-prod.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-tipo-caract-categoria',
  templateUrl: './agregar-tipo-caract-categoria.component.html',
  styleUrls: ['./agregar-tipo-caract-categoria.component.css']
})
export class AgregarTipoCaractCategoriaComponent implements OnInit {

  hasError: boolean = false;
  isSuccess: boolean = false;
  submitted: boolean = false;

  categorys: Category[] = [];
  charactCategorys: CharactCategory[] = [];

  typeCharactCatForm: FormGroup;
  states: ElementState[] = [];

  img;

  nameFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  descriptionFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  hasColorFormControl: FormControl = new FormControl('', [
  ]);

  colorFormControl: FormControl = new FormControl('', [
  ]);

  hasImgFormControl: FormControl = new FormControl('', [
  ]);

  imgFormControl: FormControl = new FormControl('', [
  ]);

  stateFormControl: FormControl = new FormControl('', [
  ]);

  extraPriceFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(0)
  ]);

  categoryIdFormControl: FormControl = new FormControl('', [
  ]);

  designLeafFormControl: FormControl = new FormControl('', [
  ]);

  charactCategoryIdFormControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  isDesign: boolean = false;

  typesLeaf: DesingLeaf[] = [];

  constructor(
    private catProdService: CatProdService,
    private formBuilder: FormBuilder
    ) {
      this.typeCharactCatForm = this.formBuilder.group({
        name: this.nameFormControl,
        description: this.descriptionFormControl,
        category_id: this.categoryIdFormControl,
        charact_category_id: this.charactCategoryIdFormControl,
        has_color: this.hasColorFormControl,
        has_img: this.hasImgFormControl,
        design_leaf: this.designLeafFormControl,
        img: this.imgFormControl,
        color: this.colorFormControl,
        extra_price: this.extraPriceFormControl,
        state: this.stateFormControl
      });
      this.states = this.catProdService.allElementStates();
    }

  ngOnInit(): void {
    this.catProdService.allCategoryWithCharact().subscribe((response) => {
      if (response.state) {
        this.categorys = response.categorys;
      }
    });
    this.typesLeaf = this.catProdService.allTypeLeaf();
    this.extraPriceFormControl.setValue(0);
    this.designLeafFormControl.setValue(null);
    this.hasColorFormControl.setValue(false);
    this.hasImgFormControl.setValue(false);
    this.colorFormControl.setValue('#ffffff');
    this.img = null;
    this.isDesign = false;
    this.stateFormControl.setValue(1);
  }

  fileImg(fileImg): void {
    this.img = fileImg[0];
  }

  changeCategory(): void {
    if (this.categoryIdFormControl.value != 'null') {
      this.categorys.forEach((cat) => {
        if (cat.id == this.categoryIdFormControl.value) {
          this.charactCategorys = cat.charact_categorys;
        }
      });
    }
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

  changeChrCat(): void {
    if (this.charactCategoryIdFormControl.value != 'null') {
      this.charactCategorys.forEach((chrCat) => {
        if (chrCat.id == this.charactCategoryIdFormControl.value) {
          this.isDesign = chrCat.is_design;
        }
      });
    }
  }

  submit(): void {
    this.submitted = true;
    this.hasError = false;
    this.isSuccess = false;
    if (this.typeCharactCatForm.valid) {
      const form = new FormData();
      form.append('name', this.nameFormControl.value);
      form.append('description', this.descriptionFormControl.value);
      form.append('characteristic_categories_id', this.charactCategoryIdFormControl.value);
      form.append('extra_price', this.extraPriceFormControl.value);
      form.append('has_color', (this.hasColorFormControl.value) ? '1' : '0');
      form.append('has_img', (this.hasImgFormControl.value) ? '1' : '0');
      form.append('state', this.stateFormControl.value);
      if (this.hasColorFormControl.value) {
        form.append('color', this.colorFormControl.value);
      }
      if (this.hasImgFormControl.value) {
        form.append('img', this.img);
      }
      this.catProdService.createTypeCharactCategory(form).subscribe(
        (response) => {
          this.submitted = false;
          if (response.state) {
            this.isSuccess = true;
            this.typeCharactCatForm.reset();
            this.extraPriceFormControl.setValue(0);
            this.designLeafFormControl.setValue(null);
            this.hasColorFormControl.setValue(false);
            this.hasImgFormControl.setValue(false);
            this.colorFormControl.setValue('#ffffff');
            this.isDesign = false;
            this.img = null;
            this.stateFormControl.setValue(1);
          } else {
            this.hasError = true;
          }
        }
      );
    }
  }

  clean(): void {
    this.extraPriceFormControl.setValue(0);
    this.designLeafFormControl.setValue(null);
    this.hasColorFormControl.setValue(false);
    this.hasImgFormControl.setValue(false);
    this.colorFormControl.setValue('#ffffff');
    this.img = null;
    this.stateFormControl.setValue(1);
    this.isDesign = false;
  }
}
