import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvpreviewComponent } from './cvpreview.component';

describe('CvpreviewComponent', () => {
  let component: CvpreviewComponent;
  let fixture: ComponentFixture<CvpreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CvpreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CvpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
