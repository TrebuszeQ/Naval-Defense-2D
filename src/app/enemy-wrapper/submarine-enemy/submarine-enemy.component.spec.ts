import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderwaterEnemyComponent } from './submarine-enemy.component';

describe('UnderwaterEnemyComponent', () => {
  let component: UnderwaterEnemyComponent;
  let fixture: ComponentFixture<UnderwaterEnemyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderwaterEnemyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnderwaterEnemyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
