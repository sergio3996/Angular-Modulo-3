import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrutaFavoritaComponent } from './fruta-favorita.component';

describe('FrutaFavoritaComponent', () => {
  let component: FrutaFavoritaComponent;
  let fixture: ComponentFixture<FrutaFavoritaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrutaFavoritaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrutaFavoritaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
