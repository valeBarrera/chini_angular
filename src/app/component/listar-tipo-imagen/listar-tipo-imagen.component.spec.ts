import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTipoImagenComponent } from './listar-tipo-imagen.component';

describe('ListarTipoImagenComponent', () => {
  let component: ListarTipoImagenComponent;
  let fixture: ComponentFixture<ListarTipoImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarTipoImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTipoImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
