import { map } from 'rxjs/operators';
import { Category } from './../../models/category';
import { Brand } from './../../models/brand';
import { environment } from './../../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from './../../shared/authentication.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { CatProdService } from './../../services/cat-prod.service';
import { User } from './../../models/user';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {

  pre: string = environment.urlApi;

  message: string = '';

  user: User = new User();

  submitted: boolean = false;

  currentProduct: Product = new Product();

  products: Product[] = [];
  page = 1;
  pageSize = 5;
  collectionSize = this.products.length;

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
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private modalService: NgbModal) {
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
    this.user = this.authService.currentUserValue;
    this.authService.currentUser.subscribe((usr) => {
      this.user = usr;
    });
  }

  ngOnInit(): void {
    this.catProdService.allProduct().subscribe((response) => {
      if (response.state) {
        this.products = response.products;
        this.collectionSize = this.products.length;
      }
    });
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
  }

  refreshProducts() {
    this.products
      .map((cat, i) => ({
        id: i + 1,
        ...cat,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  loadForm(): void {
    this.nameFormControl.setValue(this.currentProduct.name);
    this.descriptionFormControl.setValue(this.currentProduct.description);
    this.brandIdFormControl.setValue(this.currentProduct.brand_id);
    this.categoryIdFormControl.setValue(this.currentProduct.category_id);
    this.priceFormControl.setValue(this.currentProduct.price);
    this.stockFormControl.setValue(this.currentProduct.stock);
    this.hasColorFormControl.setValue(this.currentProduct.has_color);
    this.colorFormControl.setValue(this.currentProduct.color);
    this.isCustomFormControl.setValue(this.currentProduct.is_custom);
  }

  fileImg(fileImg): void {
    this.img = fileImg[0];
  }

  getFormData(arr){
      var unindexed_array = arr;
      var indexed_array = {};

      $.map(unindexed_array, function(n, i){
          indexed_array[n['name']] = n['value'];
      });

      return indexed_array;
  }

  sendForm(form): void {
    const info = this.getFormData($(form).serializeArray());
    console.log(info);
    this.catProdService.saveCharacteristics(info).subscribe((response) => {
      console.log(response);
    });
  }

  loadFormConfig(): void {
    this.currentProduct.category.charact_categorys.forEach((chrCat) => {
      if (!chrCat.is_custom) {
        for (const native of this.currentProduct.characteristics_native) {
          if (native.type_charact_category.characteristic_categories_id === chrCat.id) {
            $('#chrcat_' + chrCat.id).val(native.type_characteristic_category_id);
          }
        }
      }
    });
  }

  openModal(modalEle, product: Product, type: number): void {
    this.currentProduct = product;
    if (type === 1) {
      this.loadForm();
    }
    this.modalService.open(modalEle, { size: 'lg' });
    if (type === 3) {
      setTimeout(() => {
        this.loadFormConfig();
      }, 300);
    }
  }

  editProduct(): void {

  }

  deleteProduct(): void {

  }

}
