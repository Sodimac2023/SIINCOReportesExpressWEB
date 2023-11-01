import { TestBed } from '@angular/core/testing';

import { ReporteExpressService } from './reporte-express.service';

describe('ReporteExpressService', () => {
  let service: ReporteExpressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteExpressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
