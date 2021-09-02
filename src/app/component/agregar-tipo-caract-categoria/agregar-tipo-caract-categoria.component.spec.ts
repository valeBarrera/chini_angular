import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoCaractCategoriaComponent } from './agregar-tipo-caract-categoria.component';

describe('AgregarTipoCaractCategoriaComponent', () => {
  let component: AgregarTipoCaractCategoriaComponent;
  let fixture: ComponentFixture<AgregarTipoCaractCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarTipoCaractCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTipoCaractCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
