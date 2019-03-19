import { TestBed, inject } from '@angular/core/testing';

import { ActualiteListService } from './actualite-list.service';

describe('ActualiteListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActualiteListService]
    });
  });

  it('should be created', inject([ActualiteListService], (service: ActualiteListService) => {
    expect(service).toBeTruthy();
  }));
});
