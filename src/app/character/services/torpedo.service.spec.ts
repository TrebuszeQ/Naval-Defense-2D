import { TestBed } from '@angular/core/testing';

import { TorpedoService } from './torpedo.service';

describe('TorpedoService', () => {
  let service: TorpedoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TorpedoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
