import { TestBed, inject } from '@angular/core/testing';

import { ProduitsResolverService } from './produits-resolver.service';

describe('ProduitsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProduitsResolverService]
    });
  });

  it('should be created', inject([ProduitsResolverService], (service: ProduitsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
