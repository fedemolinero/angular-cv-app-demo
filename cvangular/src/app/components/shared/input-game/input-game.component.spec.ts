import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGameComponent } from './input-game.component';

describe('InputGameComponent', () => {
  let component: InputGameComponent;
  let fixture: ComponentFixture<InputGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
