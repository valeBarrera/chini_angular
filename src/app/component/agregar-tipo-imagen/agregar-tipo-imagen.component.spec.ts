import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoImagenComponent } from './agregar-tipo-imagen.component';

describe('AgregarTipoImagenComponent', () => {
  let component: AgregarTipoImagenComponent;
  let fixture: ComponentFixture<AgregarTipoImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarTipoImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTipoImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
