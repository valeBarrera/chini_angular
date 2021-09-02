import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCaractCategoriaComponent } from './agregar-caract-categoria.component';

describe('AgregarCaractCategoriaComponent', () => {
  let component: AgregarCaractCategoriaComponent;
  let fixture: ComponentFixture<AgregarCaractCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarCaractCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCaractCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
