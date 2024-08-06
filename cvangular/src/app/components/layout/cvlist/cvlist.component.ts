import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createNewCVModel, cvIdsModel } from '@app/models/response.model';
import { DataService } from '@app/services/data-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cvlist',
  templateUrl: './cvlist.component.html',
  styleUrls: ['./cvlist.component.scss'] // Corregido el nombre de la propiedad
})
export class CvlistComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  @Output() idSelected = new EventEmitter<number>();

  nameForm!: FormGroup;
  cvList!: cvIdsModel;

  constructor(
    private personalDataService: DataService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCVList();
  }

  get cvName() { return this.nameForm.get('cvName') }

  initForm() {
    this.nameForm = this.fb.group({
      cvName: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openEditor(id: number) {
    this.idSelected.emit(id);
  }

  removeCV(id: number) {
    this.personalDataService.deleteCv(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.idSelected.emit(0);
          this.getCVList();
        },
        error: (e) => {
          console.error(e);
        }
      });
  }

  createNewCV() {
    if (this.nameForm.valid) {
      this.personalDataService.createNewCv(this.nameForm.value.cvName)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: createNewCVModel) => {
            this.getCVList(); // No es necesario almacenar el ID aquí
          },
          error: (e) => {
            console.error(e);
          }
        });
    }
  }

  getCVList() {
    this.personalDataService.getCvList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (cvListResponse: cvIdsModel) => {
          this.cvList = cvListResponse;
        },
        error: (e) => {
          console.error(e);
        }
      });
  }
}
