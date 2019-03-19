import { TestBed, inject } from '@angular/core/testing';

import { ErrorsNotifService } from './errors-notif.service';

describe('ErrorsNotifService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorsNotifService]
    });
  });

  it('should be created', inject([ErrorsNotifService], (service: ErrorsNotifService) => {
    expect(service).toBeTruthy();
  }));
});
