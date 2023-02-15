import { TestBed } from '@angular/core/testing';

import { LevelCarouselService } from './level-carousel.service';

describe('LevelCarouselService', () => {
  let service: LevelCarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelCarouselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
