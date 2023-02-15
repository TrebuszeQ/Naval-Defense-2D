import { TestBed } from '@angular/core/testing';

import { LevelTimingService } from './level-timing.service';

describe('LevelTimingService', () => {
  let service: LevelTimingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelTimingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
