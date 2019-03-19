import { TestBed, inject } from '@angular/core/testing';

import { ReductionService } from './reduction.service';

describe('ReductionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReductionService]
    });
  });

  it('should be created', inject([ReductionService], (service: ReductionService) => {
    expect(service).toBeTruthy();
  }));
});
