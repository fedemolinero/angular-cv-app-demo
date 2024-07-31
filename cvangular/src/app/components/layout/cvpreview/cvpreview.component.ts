import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '@services/data-service.service';
import { Person } from '@models/person.model';
import { resumeDataModel } from '@app/models/cv.model';

@Component({
  selector: 'app-cv-preview',
  templateUrl: './cvpreview.component.html',
  styleUrls: ['./cvpreview.component.scss']
})
export class CvPreviewComponent implements OnInit, OnDestroy {

  @Input() personalData!: resumeDataModel;

  private personalDataSubscription: Subscription | undefined;

  constructor(
    private personalDataService: DataService
  ) {
  }

  ngOnInit(): void {
    // this.getpersonalDataList()
  }

  ngOnDestroy(): void {
    if (this.personalDataSubscription) {
      this.personalDataSubscription.unsubscribe();
    }
  }

  getpersonalDataList(id: string) {
    this.personalDataSubscription = this.personalDataService.getCv(id)
      .subscribe(
        {
          next: (personalDataResponse: resumeDataModel) => {
            this.personalData = personalDataResponse;
          },
          error: (e) => {
            console.error(e);
          }
        }
      );
  }

}