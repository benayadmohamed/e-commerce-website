import { TestBed, inject } from '@angular/core/testing';

import { ErrorsMessagesService } from './errors-messages.service';

describe('ErrorsMessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorsMessagesService]
    });
  });

  it('should be created', inject([ErrorsMessagesService], (service: ErrorsMessagesService) => {
    expect(service).toBeTruthy();
  }));
});
