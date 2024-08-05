import { Component, Input, input } from '@angular/core';
import { Certifications } from '@app/models/cv.model';

@Component({
  selector: 'app-certification-card',
  templateUrl: './certification-card.component.html',
  styleUrl: './certification-card.component.scss'
})
export class CertificationCardComponent {
  @Input() certification!: Certifications;
}
