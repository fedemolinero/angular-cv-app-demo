import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data-service.service';
import { Person } from '../models/cvPersonalData.model';

@Component({
  selector: 'app-data-wrapper',
  templateUrl: './data-wrapper.component.html',
  styleUrl: './data-wrapper.component.scss'
})
export class DataWrapperComponent implements OnInit, OnDestroy {

  personalData: any;
  private personalDataSubscription: Subscription | undefined;

  formData: Person = {
    name: '',
    secondName: '',
    lastName: '',
    city: '',
    position: '',
    aboutDescriptions: [],
    jobs: [],
    studies: [],
    languages: [],
    courses: []
  };

  onFormChanged(data: Person) {
    this.formData = data;
  }


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
          next: (personalDataResponse: any) => {
            this.personalData = personalDataResponse;
          },
          error: (e) => console.error(e)
        }
      );
  }
}

