import { TestBed, inject } from '@angular/core/testing';

import { RegionResolverService } from './region-resolver.service';

describe('RegionResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegionResolverService]
    });
  });

  it('should be created', inject([RegionResolverService], (service: RegionResolverService) => {
    expect(service).toBeTruthy();
  }));
});
