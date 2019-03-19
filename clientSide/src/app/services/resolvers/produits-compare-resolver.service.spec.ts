import { TestBed, inject } from '@angular/core/testing';

import { ProduitsCompareResolverService } from './produits-compare-resolver.service';

describe('ProduitsCompareResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProduitsCompareResolverService]
    });
  });

  it('should be created', inject([ProduitsCompareResolverService], (service: ProduitsCompareResolverService) => {
    expect(service).toBeTruthy();
  }));
});
