import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ResumeModel } from '@app/models/response.model';
import { DataService } from '@app/services/data-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cvlist',
  templateUrl: './cvlist.component.html',
  styleUrl: './cvlist.component.scss'
})
export class CvlistComponent implements OnInit, OnDestroy {

  cvList!: any;
  private cvListSubscription: Subscription = new Subscription;
  @Output() idSelected = new EventEmitter<string>();

  constructor(
    private personalDataService: DataService
  ) { }

  ngOnInit(): void {
    this.getCVList();
  }

  ngOnDestroy(): void {
    if (this.cvListSubscription) {
      this.cvListSubscription.unsubscribe();
    }
  }

  openEditor(id: any) {
    this.idSelected.emit(id);
  }

  getCVList() {
    this.cvListSubscription = this.personalDataService.getCvList()
      .subscribe(
        {
          next: (cvListResponse: any) => {
          console.log('cvListResponse', cvListResponse)
            this.cvList = cvListResponse;
          },
          error: (e) => {
            console.error(e);
          }
        }
      );
  }

}
