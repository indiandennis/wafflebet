import { TestBed, async, inject } from '@angular/core/testing';

import { SettingsModalGuard } from './settings-modal.guard';

describe('SettingsModalGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsModalGuard]
    });
  });

  it('should ...', inject([SettingsModalGuard], (guard: SettingsModalGuard) => {
    expect(guard).toBeTruthy();
  }));
});
