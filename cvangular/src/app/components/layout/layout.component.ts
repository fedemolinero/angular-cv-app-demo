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

  personalData!: resumeDataModel;
  private personalDataSubscription: Subscription | undefined;
  dataRetrieved: boolean = false;

  formData!: resumeDataModel;

  manejarEvento(id: string) {
    console.log('Evento recibido del hijo:', id);
    this.getpersonalDataList(id);
  }

  onFormChanged(data: resumeDataModel) {
    this.formData = data;
  }

  constructor(
    private personalDataService: DataService
  ) { }

  ngOnInit(): void {
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
            console.log(personalDataResponse)
            this.personalData = personalDataResponse;
            this.dataRetrieved = true;
          },
          error: (e) => console.error(e)
        }
      );
  }
}

