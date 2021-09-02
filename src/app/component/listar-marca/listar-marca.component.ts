import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from './../../shared/authentication.service';
import { CatProdService } from './../../services/cat-prod.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Brand } from './../../models/brand';
import { User } from './../../models/user';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-listar-marca',
  templateUrl: './listar-marca.component.html',
  styleUrls: ['./listar-marca.component.css'],
})
export class ListarMarcaComponent implements OnInit {
  user: User = new User();

  submitted: boolean = false;

  currentBrand: Brand = new Brand();
  message: string = '';

  @ViewChild('info')
  infoModal: ElementRef;

  brandForm: FormGroup;

  idFormControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  nameFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  descriptionFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  brands: Brand[] = [];
  page = 1;
  pageSize = 5;
  collectionSize = this.brands.length;

  constructor(
    private catProdService: CatProdService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private modalService: NgbModal
  ) {
    this.brandForm = this.formBuilder.group({
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
    this.catProdService.allBrand().subscribe((response) => {
      if (response.state) {
        this.brands = response.brands;
        this.collectionSize = this.brands.length;
      }
    });
  }

  loadForm(): void {
    this.idFormControl.setValue(this.currentBrand.id);
    this.nameFormControl.setValue(this.currentBrand.name);
    this.descriptionFormControl.setValue(this.currentBrand.description);
  }

  openModal(modalEle, brand: Brand, type: number) {
    this.currentBrand = brand;
    if (type === 1) {
      this.loadForm();
    }
    this.modalService.open(modalEle, { size: 'lg' });
  }

  editBrand(): void {
    this.submitted = true;
    if (this.brandForm.valid) {
      this.modalService.dismissAll();
      this.currentBrand = this.brandForm.value;
      this.catProdService
        .editBrand(this.currentBrand)
        .subscribe((response) => {
          if (response.state) {
            this.brands = response.brands;
            this.collectionSize = this.brands.length;
            this.message = 'Marca editada exitosamente!';
          } else {
            this.message = 'Ha ocurrido un error, intente nuevamente.';
          }
          this.modalService.open(this.infoModal, { centered: true });
        });
    }
  }

  deleteBrand(): void {
    this.modalService.dismissAll();
    this.catProdService
      .deleteBrand(this.currentBrand)
      .subscribe((response) => {
        if (response.state) {
          this.brands = response.brands;
          this.collectionSize = this.brands.length;
          this.message = 'Marca borrada exitosamente!';
        } else {
          this.message = 'Ha ocurrido un error, intente nuevamente.';
        }
        this.modalService.open(this.infoModal, { centered: true });
      });
  }

  refreshBrands() {
    this.brands
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
