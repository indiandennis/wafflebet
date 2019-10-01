import { TestBed, async, inject } from '@angular/core/testing';

import { LoginModalGuard } from './login-modal.guard';

describe('LoginModalGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginModalGuard]
    });
  });

  it('should ...', inject([LoginModalGuard], (guard: LoginModalGuard) => {
    expect(guard).toBeTruthy();
  }));
});
