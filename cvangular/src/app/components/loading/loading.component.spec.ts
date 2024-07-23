import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display message when @Input message is provided', () => {
    const testMessage = 'Loading...';
    component.message = testMessage;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const messageElement = compiled.querySelector('#loading-message');
    expect(messageElement.textContent).toContain(testMessage);
  });

  it('should not display message when @Input message is not provided', () => {
    component.message = undefined!;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const messageElement = compiled.querySelector('#loading-message');
    expect(messageElement).toBeNull();
  });
});
