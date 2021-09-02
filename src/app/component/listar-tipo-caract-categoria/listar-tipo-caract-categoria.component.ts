import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { environment } from './../../../environments/environment';
import { TypeCharactCategory } from './../../models/type-charact-category';
import { ElementState } from './../../models/element-state';
import { CharactCategory } from './../../models/charact-category';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from './../../shared/authentication.service';
import { CatProdService } from './../../services/cat-prod.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Category } from './../../models/category';
import { User } from './../../models/user';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-listar-tipo-caract-categoria',
  templateUrl: './listar-tipo-caract-categoria.component.html',
  styleUrls: ['./listar-tipo-caract-categoria.component.css']
})
export class ListarTipoCaractCategoriaComponent implements OnInit {
  user: User = new User();

  iconOk = faCheckCircle;
  iconNot = faTimesCircle;

  submitted: boolean = false;

  pre: string = environment.urlApi;

  currentTypeChartCat: TypeCharactCategory = new TypeCharactCategory();
  message: string = '';

  @ViewChild('info')
  infoModal: ElementRef;

  typeCharactCatForm: FormGroup;

  idFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

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

  charactCategoryIdFormControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  states: ElementState[] = [];

  categorys: Category[] = [];
  charactCategorys: CharactCategory[] = [];

  typesCharactCategorys: TypeCharactCategory[] = [];
  page = 1;
  pageSize = 5;
  collectionSize = this.typesCharactCategorys.length;

  constructor(
    private catProdService: CatProdService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private modalService: NgbModal
  ) {
    this.typeCharactCatForm = this.formBuilder.group({
      name: this.nameFormControl,
      description: this.descriptionFormControl,
      category_id: this.categoryIdFormControl,
      charact_category_id: this.charactCategoryIdFormControl,
      has_color: this.hasColorFormControl,
      has_img: this.hasImgFormControl,
      img: this.imgFormControl,
      color: this.colorFormControl,
      extra_price: this.extraPriceFormControl,
      state: this.stateFormControl
    });
    this.states = this.catProdService.allElementStates();

    this.user = this.authService.currentUserValue;
    this.authService.currentUser.subscribe((usr) => {
      this.user = usr;
    });

    this.catProdService.currentCategory.subscribe(
      (x) => (this.categorys = x)
    );
    this.states = this.catProdService.allElementStates();
  }

  ngOnInit(): void {
    this.catProdService.allTypeCharactCategory().subscribe((response) => {
      if (response.state) {
        this.typesCharactCategorys = response.charactCategorys;
        this.collectionSize = this.typesCharactCategorys.length;
      }
    });
    this.catProdService.allCategoryWithCharact().subscribe((response) => {
      if (response.state) {
        this.categorys = response.categorys;
      }
    });
  }

  loadForm(): void {
    this.idFormControl.setValue(this.currentTypeChartCat.id);
    this.nameFormControl.setValue(this.currentTypeChartCat.name);
    this.descriptionFormControl.setValue(this.currentTypeChartCat.description);
    this.extraPriceFormControl.setValue(this.currentTypeChartCat.extra_price);
    this.categoryIdFormControl.setValue(this.currentTypeChartCat.charact_category.category.id);
    this.changeCategory();
    this.charactCategoryIdFormControl.setValue(this.currentTypeChartCat.characteristic_categories_id);
    this.hasColorFormControl.setValue((this.currentTypeChartCat.has_color) ? 1 : 0);
    this.hasImgFormControl.setValue((this.currentTypeChartCat.has_img) ? 1 : 0);
    this.colorFormControl.setValue(this.currentTypeChartCat.color);
    this.stateFormControl.setValue((this.currentTypeChartCat.state) ? 1 : 0);
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

  openModal(modalEle, cat: TypeCharactCategory, type: number) {
    this.currentTypeChartCat = cat;
    if (type === 1) {
      this.loadForm();
    }
    this.modalService.open(modalEle, { size: 'lg' });
  }

  editCat(): void {
    this.submitted = true;
    if (this.typeCharactCatForm.valid) {
      this.modalService.dismissAll();
      const form = new FormData();
      form.append('id', this.idFormControl.value);
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
      this.catProdService
        .editTypeCharactCategory(form)
        .subscribe((response) => {
          if (response.state) {
            this.typesCharactCategorys = response.charactCategorys;
            this.collectionSize = this.typesCharactCategorys.length;
            this.message = 'Caraterística de Categoría editada exitosamente!';
          } else {
            this.message = 'Ha ocurrido un error, intente nuevamente.';
          }
          this.modalService.open(this.infoModal, { centered: true });
        });
    }
  }

  deleteCat(): void {
    this.modalService.dismissAll();
    const form = new FormData();
    form.append('id', this.idFormControl.value);
    this.catProdService
      .deleteTypeCharactCategory(form)
      .subscribe((response) => {
        if (response.state) {
          this.typesCharactCategorys = response.charactCategorys;
          this.collectionSize = this.typesCharactCategorys.length;
          this.message = 'Característica de Categoría borrada exitosamente!';
        } else {
          this.message = 'Ha ocurrido un error, intente nuevamente.';
        }
        this.modalService.open(this.infoModal, { centered: true });
      });
  }

  refreshCharactCategorys() {
    this.typesCharactCategorys
      .map((cat, i) => ({
        id: i + 1,
        ...cat,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
}
