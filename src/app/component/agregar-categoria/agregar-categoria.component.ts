import { Category } from './../../models/category';
import { CatProdService } from './../../services/cat-prod.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.css'],
})
export class AgregarCategoriaComponent implements OnInit {
  hasError: boolean = false;
  isSuccess: boolean = false;
  submitted: boolean = false;

  catForm: FormGroup;

  nameFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  descriptionFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  constructor(
    private catProdService: CatProdService,
    private formBuilder: FormBuilder
  ) {
    this.catForm = this.formBuilder.group({
      name: this.nameFormControl,
      description: this.descriptionFormControl,
    });
  }

  ngOnInit(): void {}

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
    if (this.catForm.valid) {
      const cat: Category = this.catForm.value;
      this.catProdService.createCategory(cat).subscribe((response) => {
        this.submitted = false;
        if (response.state){
          this.isSuccess = true;
          this.catForm.reset();
        } else{
          this.hasError = true;
        }
      });
    }
  }

  clean(): void {
    this.catForm.reset();
  }
}
