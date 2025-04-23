import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminCenterGuard } from '../guards/admin-center.guard';

describe('adminCenterGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => adminCenterGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
