import { Component, Input } from '@angular/core';
import { Work } from '@app/models/cv.model';

@Component({
  selector: 'app-work-card',
  templateUrl: './work-card.component.html',
  styleUrl: './work-card.component.scss'
})
export class WorkCardComponent {
  @Input() work!: Work;

}
