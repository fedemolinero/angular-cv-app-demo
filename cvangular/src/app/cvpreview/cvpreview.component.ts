import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data-service.service';
import { Person } from '../models/cvPersonalData.model';

@Component({
  selector: 'app-cv-preview',
  templateUrl: './cvpreview.component.html',
  styleUrls: ['./cvpreview.component.scss']
})
export class CvPreviewComponent implements OnInit, OnDestroy {

  @Input() personalData!: Person;

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

  getpersonalDataList() {
    this.personalDataSubscription = this.personalDataService.getCv()
      .subscribe(
        {
          next: (personalDataResponse: Person) => {
            this.personalData = personalDataResponse;
          },
          error: (e) => {
            console.error(e);
          }
        }
      );
  }

}