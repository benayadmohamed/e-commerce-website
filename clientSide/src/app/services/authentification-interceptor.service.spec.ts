import { TestBed, inject } from '@angular/core/testing';

import { AuthentificationInterceptorService } from './authentification-interceptor.service';

describe('AuthentificationInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthentificationInterceptorService]
    });
  });

  it('should be created', inject([AuthentificationInterceptorService], (service: AuthentificationInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
