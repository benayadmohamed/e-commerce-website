import { TestBed, inject } from '@angular/core/testing';

import { ColorResolverService } from './color-resolver.service';

describe('ColorResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorResolverService]
    });
  });

  it('should be created', inject([ColorResolverService], (service: ColorResolverService) => {
    expect(service).toBeTruthy();
  }));
});
