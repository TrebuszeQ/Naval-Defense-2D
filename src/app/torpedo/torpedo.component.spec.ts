import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorpedoComponent } from './torpedo.component';

describe('TorpedoComponent', () => {
  let component: TorpedoComponent;
  let fixture: ComponentFixture<TorpedoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TorpedoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorpedoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
