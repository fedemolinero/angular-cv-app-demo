import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTimeoutComponent } from './login-timeout.component';

describe('LoginTimeoutComponent', () => {
  let component: LoginTimeoutComponent;
  let fixture: ComponentFixture<LoginTimeoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginTimeoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginTimeoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
