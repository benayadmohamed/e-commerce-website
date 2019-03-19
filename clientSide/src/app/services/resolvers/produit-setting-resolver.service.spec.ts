import { TestBed, inject } from '@angular/core/testing';

import { ProduitSettingResolverService } from './produit-setting-resolver.service';

describe('ProduitSettingResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProduitSettingResolverService]
    });
  });

  it('should be created', inject([ProduitSettingResolverService], (service: ProduitSettingResolverService) => {
    expect(service).toBeTruthy();
  }));
});
