import { TestBed } from '@angular/core/testing';

import { EnemyCounterService } from './enemy-counter.service';

describe('EnemyCounterService', () => {
  let service: EnemyCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnemyCounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
