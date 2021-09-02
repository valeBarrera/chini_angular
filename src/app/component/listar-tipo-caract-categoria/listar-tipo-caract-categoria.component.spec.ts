import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTipoCaractCategoriaComponent } from './listar-tipo-caract-categoria.component';

describe('ListarTipoCaractCategoriaComponent', () => {
  let component: ListarTipoCaractCategoriaComponent;
  let fixture: ComponentFixture<ListarTipoCaractCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarTipoCaractCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTipoCaractCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
