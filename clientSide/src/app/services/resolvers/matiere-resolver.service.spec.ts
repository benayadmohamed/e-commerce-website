import { TestBed, inject } from '@angular/core/testing';

import { MatiereResolverService } from './matiere-resolver.service';

describe('MatiereResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatiereResolverService]
    });
  });

  it('should be created', inject([MatiereResolverService], (service: MatiereResolverService) => {
    expect(service).toBeTruthy();
  }));
});
