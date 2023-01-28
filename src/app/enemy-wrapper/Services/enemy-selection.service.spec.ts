import { TestBed } from '@angular/core/testing';

import { EnemySelectionService } from './enemy-selection.service';

describe('EnemySelectionService', () => {
  let service: EnemySelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnemySelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
