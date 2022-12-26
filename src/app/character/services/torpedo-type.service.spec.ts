import { TestBed } from '@angular/core/testing';

import { TorpedoTypeService } from './torpedo-type.service';

describe('TorpedoTypeService', () => {
  let service: TorpedoTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TorpedoTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
