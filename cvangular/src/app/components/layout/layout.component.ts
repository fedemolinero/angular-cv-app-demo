import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '@services/data-service.service';
import { Person } from '@models/person.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, OnDestroy {

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

