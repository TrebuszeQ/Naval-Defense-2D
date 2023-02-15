import { TestBed } from '@angular/core/testing';

import { EnemyArrayService } from './enemy-array.service';

describe('EnemyarrayService', () => {
  let service: EnemyArrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnemyArrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
