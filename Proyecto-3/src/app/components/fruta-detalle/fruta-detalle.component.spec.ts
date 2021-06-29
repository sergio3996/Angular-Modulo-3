import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrutaDetalleComponent } from './fruta-detalle.component';

describe('FrutaDetalleComponent', () => {
  let component: FrutaDetalleComponent;
  let fixture: ComponentFixture<FrutaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrutaDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrutaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
