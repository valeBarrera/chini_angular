import { ImageSide } from './../../models/image-side';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from './../../shared/authentication.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { CatProdService } from './../../services/cat-prod.service';
import { ImageType } from './../../models/image-type';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-listar-tipo-imagen',
  templateUrl: './listar-tipo-imagen.component.html',
  styleUrls: ['./listar-tipo-imagen.component.css']
})
export class ListarTipoImagenComponent implements OnInit {

  user: User = new User();

  submitted: boolean = false;

  currentImageType: ImageType = new ImageType();
  message: string = '';

  @ViewChild('info')
  infoModal: ElementRef;

  imageTypeForm: FormGroup;

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

  extraPriceFormControl: FormControl = new FormControl('', [
    Validators.min(0),
  ]);

  imageSideIdFormControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  imageSides: ImageSide[] = [];

  imagesTypes: ImageType[] = [];
  page = 1;
  pageSize = 5;
  collectionSize = this.imagesTypes.length;

  constructor(
    private catProdService: CatProdService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private modalService: NgbModal
  ) {
    this.imageTypeForm = this.formBuilder.group({
      name: this.nameFormControl,
      description: this.descriptionFormControl,
      extra_price: this.extraPriceFormControl,
      image_side_id: this.imageSideIdFormControl
    });

    this.user = this.authService.currentUserValue;
    this.authService.currentUser.subscribe((usr) => {
      this.user = usr;
    });
  }

  ngOnInit(): void {
    this.extraPriceFormControl.setValue(0);
    this.catProdService.allImageSide().subscribe((response) => {
      if (response.state) {
        this.imageSides = response.imageSides;
      }
    });
    this.catProdService.allImageType().subscribe((response) => {
      if (response.state) {
        this.imagesTypes = response.imageTypes;
      }
    });
  }

  loadForm(): void {
    this.idFormControl.setValue(this.currentImageType.id);
    this.nameFormControl.setValue(this.currentImageType.name);
    this.descriptionFormControl.setValue(this.currentImageType.description);
    this.imageSideIdFormControl.setValue((this.currentImageType.image_side_id != null) ? this.currentImageType.image_side_id : 0);
    this.extraPriceFormControl.setValue(this.currentImageType.extra_price);
  }

  openModal(modalEle, imgType: ImageType, type: number) {
    this.currentImageType = imgType;
    if (type === 1) {
      this.loadForm();
    }
    this.modalService.open(modalEle, { size: 'lg' });
  }

  editImageType(): void {
    this.submitted = true;
    if (this.imageTypeForm.valid) {
      this.modalService.dismissAll();
      this.currentImageType = this.imageTypeForm.value;
      this.catProdService
        .editImageType(this.currentImageType)
        .subscribe((response) => {
          if (response.state) {
            this.imagesTypes = response.imageTypes;
            this.collectionSize = this.imagesTypes.length;
            this.message = 'Tipo de Image editada exitosamente!';
          } else {
            this.message = 'Ha ocurrido un error, intente nuevamente.';
          }
          this.modalService.open(this.infoModal, { centered: true });
        });
    }
  }

  deleteImageType(): void {
    this.modalService.dismissAll();
    this.catProdService
      .deleteImageType(this.currentImageType)
      .subscribe((response) => {
        if (response.state) {
          this.imagesTypes = response.imageTypes;
          this.collectionSize = this.imagesTypes.length;
          this.message = 'Tipo de Imagen borrada exitosamente!';
        } else {
          this.message = 'Ha ocurrido un error, intente nuevamente.';
        }
        this.modalService.open(this.infoModal, { centered: true });
      });
  }

  refreshBrands() {
    this.imagesTypes
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
