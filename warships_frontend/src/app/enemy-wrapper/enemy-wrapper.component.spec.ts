import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemyWrapperComponent } from './enemy-wrapper.component';

describe('EnemyWrapperComponent', () => {
  let component: EnemyWrapperComponent;
  let fixture: ComponentFixture<EnemyWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnemyWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnemyWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
