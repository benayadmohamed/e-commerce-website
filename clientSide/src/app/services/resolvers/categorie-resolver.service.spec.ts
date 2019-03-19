import { TestBed, inject } from '@angular/core/testing';

import { CategorieResolverService } from './categorie-resolver.service';

describe('CategorieResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategorieResolverService]
    });
  });

  it('should be created', inject([CategorieResolverService], (service: CategorieResolverService) => {
    expect(service).toBeTruthy();
  }));
});
