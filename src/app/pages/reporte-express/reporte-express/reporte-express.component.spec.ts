import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteExpressComponent } from './reporte-express.component';

describe('ReporteExpressComponent', () => {
  let component: ReporteExpressComponent;
  let fixture: ComponentFixture<ReporteExpressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteExpressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteExpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
