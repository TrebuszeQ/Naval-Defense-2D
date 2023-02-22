import { TestBed } from '@angular/core/testing';

import { LevelArrayService } from './level-array.service';

describe('LevelArrayService', () => {
  let service: LevelArrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelArrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
