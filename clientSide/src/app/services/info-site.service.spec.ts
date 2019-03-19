import { TestBed, inject } from '@angular/core/testing';

import { InfoSiteService } from './info-site.service';

describe('InfoSiteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoSiteService]
    });
  });

  it('should be created', inject([InfoSiteService], (service: InfoSiteService) => {
    expect(service).toBeTruthy();
  }));
});
