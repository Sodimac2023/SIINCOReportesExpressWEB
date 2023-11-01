import { TestBed } from '@angular/core/testing';

import { FeaturesStateService } from './features-state.service';

describe('FeaturesStateService', () => {
  let service: FeaturesStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeaturesStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
