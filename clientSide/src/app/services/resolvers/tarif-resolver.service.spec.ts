import { TestBed, inject } from '@angular/core/testing';

import { TarifResolverService } from './tarif-resolver.service';

describe('TarifResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TarifResolverService]
    });
  });

  it('should be created', inject([TarifResolverService], (service: TarifResolverService) => {
    expect(service).toBeTruthy();
  }));
});
