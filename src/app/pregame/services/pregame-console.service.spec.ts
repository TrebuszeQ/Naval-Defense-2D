import { TestBed } from '@angular/core/testing';

import { PregameConsoleService } from './pregame-console.service';

describe('PregameConsoleService', () => {
  let service: PregameConsoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PregameConsoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
