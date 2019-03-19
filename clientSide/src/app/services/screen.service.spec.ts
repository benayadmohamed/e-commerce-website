import { TestBed, inject } from '@angular/core/testing';

import { ScreenService } from './screen.service';

describe('ScreenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScreenService]
    });
  });

  it('should be created', inject([ScreenService], (service: ScreenService) => {
    expect(service).toBeTruthy();
  }));
});
