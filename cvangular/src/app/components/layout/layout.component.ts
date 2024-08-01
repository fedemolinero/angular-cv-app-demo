import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  cvData!: resumeDataModel;

  constructor(
    private personalDataService: DataService
  ) { }

  inputEvent(id: string) {
    this.personalDataSubscription = this.personalDataService.getCv(id)
      .subscribe(
        {
          next: (cvListResponse: resumeDataModel) => {
            console.log('cvData', cvListResponse)
            this.cvData = cvListResponse;
          },
          error: (e) => {
            console.error(e);
          }
        }
      );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}

