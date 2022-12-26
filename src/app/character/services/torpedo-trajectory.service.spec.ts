import { TestBed } from '@angular/core/testing';

import { TorpedoTrajectoryService } from './torpedo-trajectory.service';

describe('TorpedoTrajectoryService', () => {
  let service: TorpedoTrajectoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TorpedoTrajectoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
