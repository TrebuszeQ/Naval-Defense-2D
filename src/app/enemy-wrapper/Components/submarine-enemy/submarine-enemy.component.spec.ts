import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmarineEnemyComponent } from './submarine-enemy.component';

describe('SubmarineEnemyComponent', () => {
  let component: SubmarineEnemyComponent;
  let fixture: ComponentFixture<SubmarineEnemyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmarineEnemyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmarineEnemyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
