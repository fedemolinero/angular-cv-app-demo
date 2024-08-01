import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternCrazyComponent } from './pattern-crazy.component';

describe('PatternCrazyComponent', () => {
  let component: PatternCrazyComponent;
  let fixture: ComponentFixture<PatternCrazyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatternCrazyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatternCrazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
