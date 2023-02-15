import { TestBed } from '@angular/core/testing';

import { TorpedoEffectsService } from './torpedo-effects.service';

describe('TorpedoEffectsService', () => {
  let service: TorpedoEffectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TorpedoEffectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
