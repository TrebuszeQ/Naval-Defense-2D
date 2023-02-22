import { TestBed } from '@angular/core/testing';

import { WarshipTypeArrayService } from './warship-type-array.service';

describe('WarshipTypeArrayService', () => {
  let service: WarshipTypeArrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarshipTypeArrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
