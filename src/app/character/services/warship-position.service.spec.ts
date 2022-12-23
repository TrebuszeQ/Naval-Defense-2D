import { TestBed } from '@angular/core/testing';

import { WarshipPositionService } from './warship-position.service';

describe('WarshipPositionService', () => {
  let service: WarshipPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarshipPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
