import { Component } from '@angular/core';

@Component({
  selector: 'app-buttontoggler',
  templateUrl: './buttontoggler.component.html',
  styleUrl: './buttontoggler.component.scss'
})

export class ButtontogglerComponent {
  name = 'Angular';

  buttons = [
    { label: 'Button 1', x: 0, y: 0 },
    { label: 'Button 2', x: 105, y: 0 },
    { label: 'Button 3', x: 210, y: 0 },
    { label: 'Button 4', x: 0, y: 60 },
    { label: 'Button 5', x: 105, y: 60 },
    { label: 'Button 6', x: 210, y: 60 },
  ];

  selectedButtonIndex: number | null = null;

  swap(currentIndex: number) {
    if (this.selectedButtonIndex === null) {
      this.selectedButtonIndex = currentIndex;
      return;
    }

    const prevX = this.buttons[this.selectedButtonIndex].x;
    const prevY = this.buttons[this.selectedButtonIndex].y;

    this.buttons[this.selectedButtonIndex].x = this.buttons[currentIndex].x;
    this.buttons[this.selectedButtonIndex].y = this.buttons[currentIndex].y;

    this.buttons[currentIndex].x = prevX;
    this.buttons[currentIndex].y = prevY;

    this.selectedButtonIndex = null;
  }

}
