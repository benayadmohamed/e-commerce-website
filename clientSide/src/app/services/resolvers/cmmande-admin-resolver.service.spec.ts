import { TestBed, inject } from '@angular/core/testing';

import { CmmandeAdminResolverService } from './cmmande-admin-resolver.service';

describe('CmmandeAdminResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CmmandeAdminResolverService]
    });
  });

  it('should be created', inject([CmmandeAdminResolverService], (service: CmmandeAdminResolverService) => {
    expect(service).toBeTruthy();
  }));
});
