import { TestBed, inject } from '@angular/core/testing';

import { CommandeNotificationService } from './commande-notification.service';

describe('CommandeNotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandeNotificationService]
    });
  });

  it('should be created', inject([CommandeNotificationService], (service: CommandeNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
