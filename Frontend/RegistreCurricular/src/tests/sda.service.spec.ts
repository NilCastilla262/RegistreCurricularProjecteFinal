import { TestBed } from '@angular/core/testing';

import { SdaService } from './sda.service';

describe('SdaService', () => {
  let service: SdaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SdaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
