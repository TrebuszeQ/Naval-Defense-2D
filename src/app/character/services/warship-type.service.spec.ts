import { TestBed } from '@angular/core/testing';

import { WarshipTypeService } from './warship-type.service';

describe('WarshipTypeService', () => {
  let service: WarshipTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarshipTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
