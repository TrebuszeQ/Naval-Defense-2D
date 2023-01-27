import { TestBed } from '@angular/core/testing';

import { RightUiLogService } from './right-ui-log.service';

describe('RightUiLogService', () => {
  let service: RightUiLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RightUiLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
