import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginTimeoutComponent } from './login-timeout.component';

describe('LoginTimeoutComponent', () => {
  let component: LoginTimeoutComponent;
  let fixture: ComponentFixture<LoginTimeoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginTimeoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTimeoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should start countdown and update remaining time', (done) => {
    component.timeoutMinutes = 1;
    component.ngOnInit();

    fixture.detectChanges();

    setTimeout(() => {
      expect(component.remainingTime).toBeGreaterThan(0);
      done();
    }, 1500); // Esperar más tiempo que el tiempo de espera, para asegurar que se actualice al menos una vez
  });

  it('should unsubscribe countdown on ngOnDestroy', () => {
    spyOn(component['countdownSubscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['countdownSubscription'].unsubscribe).toHaveBeenCalled();
  });
});
