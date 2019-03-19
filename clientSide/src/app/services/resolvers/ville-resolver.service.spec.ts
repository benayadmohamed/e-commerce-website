import { TestBed, inject } from '@angular/core/testing';

import { VilleResolverService } from './ville-resolver.service';

describe('VilleResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VilleResolverService]
    });
  });

  it('should be created', inject([VilleResolverService], (service: VilleResolverService) => {
    expect(service).toBeTruthy();
  }));
});
