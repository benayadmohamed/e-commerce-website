import { TestBed, inject } from '@angular/core/testing';

import { ProduitsAdminResolverService } from './produits-admin-resolver.service';

describe('ProduitsAdminResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProduitsAdminResolverService]
    });
  });

  it('should be created', inject([ProduitsAdminResolverService], (service: ProduitsAdminResolverService) => {
    expect(service).toBeTruthy();
  }));
});
