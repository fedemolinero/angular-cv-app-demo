import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '@services/data-service.service';
import { resumeDataModel } from '@app/models/cv.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, OnDestroy {

  private personalDataSubscription: Subscription = new Subscription();
  personalData!: resumeDataModel;
  formData!: resumeDataModel;

  constructor(
    private personalDataService: DataService
  ) { }

  ngOnInit(): void {
    this.getpersonalDataList()
  }

  getpersonalDataList() {
    this.personalDataSubscription = this.personalDataService.getCvList()
      .subscribe(
        {
          next: (personalDataResponse: resumeDataModel) => {
            this.personalData = personalDataResponse;
          },
          error: (e) => console.error(e)
        }
      );
  }

  ngOnDestroy(): void {
    if (this.personalDataSubscription) {
      this.personalDataSubscription.unsubscribe();
    }
  }

}

