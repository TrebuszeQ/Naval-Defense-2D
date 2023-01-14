import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarshipDescriptionComponent } from './warship-description.component';

describe('WarshipDescriptionComponent', () => {
  let component: WarshipDescriptionComponent;
  let fixture: ComponentFixture<WarshipDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarshipDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarshipDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
