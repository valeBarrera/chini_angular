import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCaractCategoriaComponent } from './listar-caract-categoria.component';

describe('ListarCaractCategoriaComponent', () => {
  let component: ListarCaractCategoriaComponent;
  let fixture: ComponentFixture<ListarCaractCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarCaractCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCaractCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
