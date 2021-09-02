import { Category } from './../../models/category';
import { Brand } from './../../models/brand';
import { Product } from './../../models/product';
import { CatProdService } from './../../services/cat-prod.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  hasError: boolean = false;
  isSuccess: boolean = false;
  submitted: boolean = false;

  productForm: FormGroup;

  nameFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  descriptionFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  brandIdFormControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  categoryIdFormControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  hasColorFormControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  colorFormControl: FormControl = new FormControl('', [
  ]);

  priceFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(100)
  ]);

  stockFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(1)
  ]);

  imgFormControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  isCustomFormControl: FormControl = new FormControl('', [
  ]);

  img;

  brands: Brand[] = [];
  categorys: Category[] = [];

  constructor(
    private catProdService: CatProdService,
    private formBuilder: FormBuilder) {
      this.productForm = this.formBuilder.group({
        name: this.nameFormControl,
        description: this.descriptionFormControl,
        brand_id: this.brandIdFormControl,
        category_id: this.categoryIdFormControl,
        price: this.priceFormControl,
        stock: this.stockFormControl,
        img: this.imgFormControl,
        is_custom: this.isCustomFormControl,
        has_color: this.hasColorFormControl,
        color: this.colorFormControl
      });
  }

  ngOnInit(): void {
    this.catProdService.allBrand().subscribe((response) => {
      if (response.state) {
        this.brands = response.brands;
      }
    });

    this.catProdService.allCategory().subscribe((response) => {
      if (response.state) {
        this.categorys = response.categorys;
      }
    });

    this.resetField();
  }

  resetField(): void {
    this.img = null;
    this.imgFormControl.setValue(null);
    this.brandIdFormControl.setValue(null);
    this.categoryIdFormControl.setValue(null);
    this.isCustomFormControl.setValue(false);
    this.hasColorFormControl.setValue(false);
    this.colorFormControl.setValue('#ffffff');
  }

  fileImg(fileImg): void {
    this.img = fileImg[0];
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
    if (this.productForm.valid) {
      const form = new FormData();
      form.append('name', this.nameFormControl.value);
      form.append('description', this.descriptionFormControl.value);
      form.append('is_custom', this.isCustomFormControl.value ? '1' : '0');
      form.append('price', this.priceFormControl.value);
      form.append('stock', this.stockFormControl.value);
      form.append('category_id', this.categoryIdFormControl.value);
      form.append('brand_id', this.brandIdFormControl.value);
      form.append('has_color', this.hasColorFormControl.value ? '1' : '0');
      if (this.hasColorFormControl.value){
        form.append('color', this.colorFormControl.value);
      }
      form.append('img', this.img);
      this.catProdService.createProduct(form).subscribe((response) => {
        this.submitted = false;
        if (response.state) {
          this.isSuccess = true;
          this.clean();
        } else {
          this.hasError = true;
        }
      });
    }
  }

  clean(): void {
    this.productForm.reset();
    this.resetField();
  }

}
