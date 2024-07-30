import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TridimensionComponent } from './tridimension.component';

describe('TridimensionComponent', () => {
  let component: TridimensionComponent;
  let fixture: ComponentFixture<TridimensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TridimensionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TridimensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
