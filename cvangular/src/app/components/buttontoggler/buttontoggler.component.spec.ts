import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtontogglerComponent } from './buttontoggler.component';

describe('ButtontogglerComponent', () => {
  let component: ButtontogglerComponent;
  let fixture: ComponentFixture<ButtontogglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtontogglerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtontogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
