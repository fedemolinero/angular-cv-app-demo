import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '@services/data-service.service';
import { resumeDataModel } from '@app/models/cv.model';

@Component({
  selector: 'app-cv-preview',
  templateUrl: './cvpreview.component.html',
  styleUrls: ['./cvpreview.component.scss']
})
export class CvPreviewComponent {

  @Input() personalData!: resumeDataModel;

  constructor() { }

}