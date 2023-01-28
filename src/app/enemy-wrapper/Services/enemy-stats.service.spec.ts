import { TestBed } from '@angular/core/testing';

import { EnemyStatsService } from './enemy-stats.service';

describe('EnemyPositionService', () => {
  let service: EnemyStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnemyStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
