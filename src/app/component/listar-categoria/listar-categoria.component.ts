import { CharactCategory } from './../../models/charact-category';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { User } from './../../models/user';
import { AuthenticationService } from './../../shared/authentication.service';
import { Category } from './../../models/category';
import { CatProdService } from './../../services/cat-prod.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.css'],
})
export class ListarCategoriaComponent implements OnInit {
  user: User = new User();

  submitted: boolean = false;

  currentCat: Category = new Category();
  message: string = '';

  @ViewChild('info')
  infoModal: ElementRef;

  catForm: FormGroup;

  idFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  nameFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  descriptionFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  categorys: Category[] = [];
  characteristics: CharactCategory[] = [];

  page = 1;
  pageSize = 5;
  collectionSize = this.categorys.length;

  page1 = 1;
  pageSize1 = 5;
  collectionSize1 = this.characteristics.length;

  constructor(
    private catProdService: CatProdService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private modalService: NgbModal
  ) {
    this.catForm = this.formBuilder.group({
      id: this.idFormControl,
      name: this.nameFormControl,
      description: this.descriptionFormControl,
    });

    this.user = this.authService.currentUserValue;
    this.authService.currentUser.subscribe((usr) => {
      this.user = usr;
    });
  }

  ngOnInit(): void {
    this.catProdService.allCategoryWithCharact().subscribe((response) => {
      if (response.state) {
        this.categorys = response.categorys;
        this.collectionSize = this.categorys.length;
      }
    });
  }

  loadForm(): void {
    this.idFormControl.setValue(this.currentCat.id);
    this.nameFormControl.setValue(this.currentCat.name);
    this.descriptionFormControl.setValue(this.currentCat.description);
  }

  openModal(modalEle, cat: Category, type: number) {
    this.currentCat = cat;
    this.characteristics = this.currentCat.charact_categorys;
    if (type === 1) {
      this.loadForm();
    }
    this.modalService.open(modalEle, { size: 'lg' });
  }

  editCat(): void {
    this.submitted = true;
    if (this.catForm.valid){
      this.modalService.dismissAll();
      this.currentCat = this.catForm.value;
      this.catProdService.editCategory(this.currentCat).subscribe((response) => {
        if (response.state) {
          this.categorys = response.categorys;
          this.collectionSize = this.categorys.length;
          this.message = 'Categoría editada exitosamente!';
        } else {
          this.message = 'Ha ocurrido un error, intente nuevamente.';
        }
        this.modalService.open(this.infoModal, { centered: true });
      });
    }
  }

  deleteCat(): void {
    this.modalService.dismissAll();
    this.catProdService
      .deleteCategory(this.currentCat)
      .subscribe((response) => {
        if (response.state) {
          this.categorys = response.categorys;
          this.collectionSize = this.categorys.length;
          this.message = 'Categoría borrada exitosamente!';
        } else {
          this.message = 'Ha ocurrido un error, intente nuevamente.';
        }
        this.modalService.open(this.infoModal, { centered: true });
      });
  }

  refreshCategorys() {
    this.categorys
      .map((cat, i) => ({
        id: i + 1,
        ...cat,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  refreshCharacteristic() {
    this.characteristics
      .map((cat, i) => ({
        id: i + 1,
        ...cat,
      }))
      .slice(
        (this.page1 - 1) * this.pageSize1,
        (this.page1 - 1) * this.pageSize1 + this.pageSize1
      );
  }
}
