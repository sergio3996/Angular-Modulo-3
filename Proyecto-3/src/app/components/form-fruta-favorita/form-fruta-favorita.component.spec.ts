import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFrutaFavoritaComponent } from './form-fruta-favorita.component';

describe('FormFrutaFavoritaComponent', () => {
  let component: FormFrutaFavoritaComponent;
  let fixture: ComponentFixture<FormFrutaFavoritaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFrutaFavoritaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFrutaFavoritaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
