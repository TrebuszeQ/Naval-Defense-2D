import { TestBed } from '@angular/core/testing';

import { EnemyPositionService } from './enemy-position.service';

describe('EnemyPositionService', () => {
  let service: EnemyPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnemyPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
