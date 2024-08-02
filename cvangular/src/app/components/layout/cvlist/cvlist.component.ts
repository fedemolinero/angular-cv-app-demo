import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { createNewCVModel, cvIdsModel } from '@app/models/response.model';
import { DataService } from '@app/services/data-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cvlist',
  templateUrl: './cvlist.component.html',
  styleUrl: './cvlist.component.scss'
})
export class CvlistComponent implements OnInit, OnDestroy {
  private cvListSubscription: Subscription = new Subscription;
  @Output() idSelected = new EventEmitter<string>();

  cvList!: cvIdsModel;
  name: string = 'new';
  newID!: string;

  constructor(private personalDataService: DataService) { }

  ngOnInit(): void {
    this.getCVList();
  }

  ngOnDestroy(): void {
    if (this.cvListSubscription) {
      this.cvListSubscription.unsubscribe();
    }
  }

  openEditor(id: string) {
    this.idSelected.emit(id);
  }

  createNewCV() {
    this.personalDataService.createNewCv(this.name)
      .subscribe(
        {
          next: (response: createNewCVModel) => {
            this.newID = response.newId;
          },
          error: (e) => {
            console.error(e);
          }
        }
      );
  }

  getCVList() {
    this.cvListSubscription = this.personalDataService.getCvList()
      .subscribe(
        {
          next: (cvListResponse: cvIdsModel) => {
            this.cvList = cvListResponse;
          },
          error: (e) => {
            console.error(e);
          }
        }
      );
  }

}
