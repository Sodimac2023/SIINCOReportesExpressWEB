import { TestBed } from '@angular/core/testing';

import { ReporteExpressSateService } from './reporte-express-state.service';

describe('ReporteExpressService', () => {
  let service: ReporteExpressSateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteExpressSateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
