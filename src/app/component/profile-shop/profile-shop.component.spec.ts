import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileShopComponent } from './profile-shop.component';

describe('ProfileShopComponent', () => {
  let component: ProfileShopComponent;
  let fixture: ComponentFixture<ProfileShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
