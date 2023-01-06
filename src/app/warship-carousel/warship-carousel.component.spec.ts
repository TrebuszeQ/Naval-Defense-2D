import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarshipCarouselComponent } from './warship-carousel.component';

describe('WarshipCarouselComponent', () => {
  let component: WarshipCarouselComponent;
  let fixture: ComponentFixture<WarshipCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarshipCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarshipCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
