import { TestBed, inject } from '@angular/core/testing';

import { InfoSiteResolverService } from './info-site-resolver.service';

describe('InfoSiteResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoSiteResolverService]
    });
  });

  it('should be created', inject([InfoSiteResolverService], (service: InfoSiteResolverService) => {
    expect(service).toBeTruthy();
  }));
});
