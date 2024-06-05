import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data-service.service';
import { Person } from '../models/cvPersonalData.model';
// import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-cv-preview',
  templateUrl: './cvpreview.component.html',
  styleUrls: ['./cvpreview.component.scss']
})
export class CvPreviewComponent implements OnInit, OnDestroy {

  personalData!: Person;

  private personalDataSubscription: Subscription | undefined;

  constructor(
    private personalDataService: DataService
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

  // {
  //   generatePdf() {
  //     const doc = new jsPDF();
  //     doc.text('This is my CV', 10, 10);
  //     doc.save('cv.pdf');
  //   }
  // }

}

