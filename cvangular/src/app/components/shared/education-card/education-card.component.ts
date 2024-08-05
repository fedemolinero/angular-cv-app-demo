import { Component, Input } from '@angular/core';
import { Education } from '@app/models/cv.model';

@Component({
  selector: 'app-education-card',
  templateUrl: './education-card.component.html',
  styleUrl: './education-card.component.scss'
})
export class EducationCardComponent {
  @Input() education!: Education;
}
