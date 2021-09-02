import { ImageType } from './../../models/image-type';
import { TypeCharactCategory } from './../../models/type-charact-category';
import { ElementState } from './../../models/element-state';
import { Category } from './../../models/category';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from './../../shared/authentication.service';
import { CatProdService } from './../../services/cat-prod.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { User } from './../../models/user';
import { CharactCategory } from './../../models/charact-category';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-listar-caract-categoria',
  templateUrl: './listar-caract-categoria.component.html',
  styleUrls: ['./listar-caract-categoria.component.css'],
})
export class ListarCaractCategoriaComponent implements OnInit {
  user: User = new User();

  iconOk = faCheckCircle;
  iconNot = faTimesCircle;

  submitted: boolean = false;

  currentChartCat: CharactCategory = new CharactCategory();
  message: string = '';

  categorys: Category[] = [];
  imageTypes: ImageType[] = [];

  @ViewChild('info')
  infoModal: ElementRef;

  charactCatForm: FormGroup;

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

  categoryIdFormControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  isCustomFormControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  isOptionalFormControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  isImageFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  isDesignFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  imageTypeIdFormControl: FormControl = new FormControl('', [
  ]);

  priceFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(0)
  ]);

  stateFormControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  states: ElementState[] = [];

  charactCategorys: CharactCategory[] = [];
  typesCharactCategorys: TypeCharactCategory[] = [];

  page = 1;
  pageSize = 5;
  collectionSize = this.charactCategorys.length;

  page1 = 1;
  pageSize1 = 5;
  collectionSize1 = this.typesCharactCategorys.length;

  constructor(
    private catProdService: CatProdService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private modalService: NgbModal
  ) {
    this.charactCatForm = this.formBuilder.group({
      id: this.idFormControl,
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
    this.catProdService.allImageType().subscribe((response) => {
      if (response.state) {
        this.imageTypes = response.imageTypes;
      }
    });
    this.catProdService.allCharactCategory().subscribe((response) => {
      if (response.state) {
        this.charactCategorys = response.charactCategorys;
        this.collectionSize = this.charactCategorys.length;
      }
    });
    this.catProdService.allCategory().subscribe((response) => {
      if (response.state) {
        this.categorys = response.categorys;
      }
    });
  }

  loadForm(): void {
    this.idFormControl.setValue(this.currentChartCat.id);
    this.nameFormControl.setValue(this.currentChartCat.name);
    this.descriptionFormControl.setValue(this.currentChartCat.description);
    this.isCustomFormControl.setValue(this.currentChartCat.is_custom);
    this.isOptionalFormControl.setValue(this.currentChartCat.is_optional);
    this.isImageFormControl.setValue(this.currentChartCat.is_image);
    this.isDesignFormControl.setValue(this.currentChartCat.is_design);
    this.priceFormControl.setValue(this.currentChartCat.price);
    this.categoryIdFormControl.setValue(this.currentChartCat.category_id);
    this.stateFormControl.setValue((this.currentChartCat.state) ? 1 : 0);
    this.imageTypeIdFormControl.setValue(this.currentChartCat.image_type_id);
  }

  openModal(modalEle, cat: CharactCategory, type: number) {
    this.currentChartCat = cat;
    this.typesCharactCategorys = this.currentChartCat.type_charact_categorys;
    if (type === 1) {
      this.loadForm();
    }
    this.modalService.open(modalEle, { size: 'lg' });
  }

  editCat(): void {
    this.submitted = true;
    if (this.charactCatForm.valid) {
      this.modalService.dismissAll();
      this.currentChartCat = this.charactCatForm.value;
      this.catProdService
        .editCharactCategory(this.currentChartCat)
        .subscribe((response) => {
          if (response.state) {
            this.charactCategorys = response.charactCategorys;
            this.collectionSize = this.charactCategorys.length;
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
    this.catProdService
      .deleteCharactCategory(this.currentChartCat)
      .subscribe((response) => {
        if (response.state) {
          this.charactCategorys = response.charactCategorys;
          this.collectionSize = this.charactCategorys.length;
          this.message = 'Característica de Categoría borrada exitosamente!';
        } else {
          this.message = 'Ha ocurrido un error, intente nuevamente.';
        }
        this.modalService.open(this.infoModal, { centered: true });
      });
  }

  refreshCharactCategorys() {
    this.charactCategorys
      .map((cat, i) => ({
        id: i + 1,
        ...cat,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  refreshTypesCharactCategorys() {
    this.typesCharactCategorys
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
