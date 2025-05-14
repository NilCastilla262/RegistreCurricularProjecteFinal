import { TestBed } from '@angular/core/testing';

import { UserGroupRelationService } from './user-group-relation.service';

describe('UserGroupRelationService', () => {
  let service: UserGroupRelationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGroupRelationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
