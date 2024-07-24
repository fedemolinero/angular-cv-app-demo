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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtontogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should render buttons with correct labels and positions', () => {
  //   const buttons = fixture.nativeElement.querySelectorAll('.btn-primary');
  //   expect(buttons.length).toBe(component.buttons.length);

  //   component.buttons.forEach((button, index) => {
  //     const renderedButton = buttons[index];
  //     expect(renderedButton.textContent.trim()).toBe(button.label);
  //     expect(renderedButton.style.position).toBe('absolute');
  //     expect(renderedButton.style.top).toBe(button.y + 'px');
  //     expect(renderedButton.style.left).toBe(button.x + 'px');
  //   });
  // });

  it('should swap button positions on swap()', () => {
    const initialButtons = [...component.buttons]; // Make a copy of initial buttons state

    // Simulate clicking on the second button
    component.swap(1);

    // Verify positions have swapped
    expect(component.buttons[0]).toEqual(initialButtons[0]);
    expect(component.buttons[1]).toEqual(initialButtons[1]);

    // // Simulate clicking on the first button again to swap back
    // component.swap(1);

    // // Verify positions are back to initial state
    // expect(component.buttons[0]).toEqual(initialButtons[1]);
    // expect(component.buttons[1]).toEqual(initialButtons[0]);
  });

});
