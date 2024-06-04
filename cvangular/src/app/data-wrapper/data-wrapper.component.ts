import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-data-wrapper',
  templateUrl: './data-wrapper.component.html',
  styleUrl: './data-wrapper.component.scss'
})
export class DataWrapperComponent implements OnInit, OnDestroy {

  personalData: any;
  private personalDataSubscription: Subscription | undefined;

  constructor(
    private personalDataervice: DataService
  ) {
  }

  ngOnInit(): void {
    this.getpersonalDataList()
  }

  ngOnDestroy(): void {
    if (this.personalDataSubscription) {
      this.personalDataSubscription.unsubscribe();
    }
  }

  getpersonalDataList() {
    this.personalDataSubscription = this.personalDataervice.getCv()
      .subscribe(
        {
          next: (personalDataResponse: any) => {
            this.personalData = personalDataResponse;
          },
          error: (e) => console.error(e)
        }
      );
  }
}

