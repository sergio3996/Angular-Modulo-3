import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasMasInfoComponent } from './ventas-mas-info.component';

describe('VentasMasInfoComponent', () => {
  let component: VentasMasInfoComponent;
  let fixture: ComponentFixture<VentasMasInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasMasInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasMasInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
