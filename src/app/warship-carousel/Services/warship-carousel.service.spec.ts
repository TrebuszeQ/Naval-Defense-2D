import { TestBed } from '@angular/core/testing';

import { WarshipCarouselService } from './warship-carousel.service';

describe('WarshipCarouselService', () => {
  let service: WarshipCarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarshipCarouselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
