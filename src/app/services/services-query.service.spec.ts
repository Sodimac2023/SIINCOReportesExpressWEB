import { TestBed } from '@angular/core/testing';

import { ServicesQueryService } from './services-query.service';

describe('ServicesQueryService', () => {
  let service: ServicesQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
