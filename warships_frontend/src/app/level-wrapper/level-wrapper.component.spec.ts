import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelWrapperComponent } from './level-wrapper.component';

describe('LevelWrapperComponent', () => {
  let component: LevelWrapperComponent;
  let fixture: ComponentFixture<LevelWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
