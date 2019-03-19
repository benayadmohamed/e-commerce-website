import { TestBed, inject } from '@angular/core/testing';

import { ReductionResolverService } from './reduction-resolver.service';

describe('ReductionResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReductionResolverService]
    });
  });

  it('should be created', inject([ReductionResolverService], (service: ReductionResolverService) => {
    expect(service).toBeTruthy();
  }));
});
