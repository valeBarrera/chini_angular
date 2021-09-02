import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotpermisionComponent } from './notpermision.component';

describe('NotpermisionComponent', () => {
  let component: NotpermisionComponent;
  let fixture: ComponentFixture<NotpermisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotpermisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotpermisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
