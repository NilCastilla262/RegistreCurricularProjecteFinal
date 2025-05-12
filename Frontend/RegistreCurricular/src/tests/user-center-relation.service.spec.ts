import { TestBed } from '@angular/core/testing';

import { UserCenterRelationService } from './user-center-relation.service';

describe('UserCenterRelationService', () => {
  let service: UserCenterRelationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCenterRelationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
