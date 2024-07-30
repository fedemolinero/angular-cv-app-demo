import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesnotogglerComponent } from './yesnotoggler.component';

describe('YesnotogglerComponent', () => {
  let component: YesnotogglerComponent;
  let fixture: ComponentFixture<YesnotogglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YesnotogglerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YesnotogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
