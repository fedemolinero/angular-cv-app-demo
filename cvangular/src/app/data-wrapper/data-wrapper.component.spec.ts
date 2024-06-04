import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataWrapperComponent } from './data-wrapper.component';

describe('DataWrapperComponent', () => {
  let component: DataWrapperComponent;
  let fixture: ComponentFixture<DataWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
