import { Component, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DataService } from '@services/data-service.service';
import { resumeDataModel } from '@app/models/cv.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnDestroy {

  private destroy$ = new Subject<void>();
  cvData: resumeDataModel | null = null;
  cvSavedData: resumeDataModel | null = null;

  constructor(
    private personalDataService: DataService
  ) { }

  inputEvent(id: number) {
    if (id !== 0) {
      this.personalDataService.getCvById(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (cvListResponse: resumeDataModel) => {
            this.cvData = cvListResponse;
          },
          error: (e) => {
            console.error(e);
          }
        });
    } else {
      this.cvData = null;
    }
  }

  savedDataEvent(savedData: { cvData: resumeDataModel }) {
    this.cvSavedData = savedData.cvData;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
