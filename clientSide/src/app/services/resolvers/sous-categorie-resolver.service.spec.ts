import { TestBed, inject } from '@angular/core/testing';

import { SousCategorieResolverService } from './sous-categorie-resolver.service';

describe('SousCategorieResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SousCategorieResolverService]
    });
  });

  it('should be created', inject([SousCategorieResolverService], (service: SousCategorieResolverService) => {
    expect(service).toBeTruthy();
  }));
});
