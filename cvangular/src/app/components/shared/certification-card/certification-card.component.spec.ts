import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationCardComponent } from './certification-card.component';

describe('CertificationCardComponent', () => {
  let component: CertificationCardComponent;
  let fixture: ComponentFixture<CertificationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificationCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CertificationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
