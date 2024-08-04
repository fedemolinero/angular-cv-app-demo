import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  @Output() idSelected = new EventEmitter<number>();

  nameForm!: FormGroup;
  cvList!: cvIdsModel;
  // name: string = 'new';
  newID!: string;

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
    })
  };

  ngOnDestroy(): void {
    if (this.cvListSubscription) {
      this.cvListSubscription.unsubscribe();
    }
  }

  openEditor(id: number) {
    this.idSelected.emit(id);
  }

  removeCV(name: number) {

    this.personalDataService.deleteCv(name)
      .subscribe(
        {
          next: (response: any) => {
            this.getCVList();
            console.log('response', response)
          },
          error: (e) => {
            console.error(e);
          }
        }
      );

  }

  createNewCV() {
    this.personalDataService.createNewCv(this.nameForm.value.cvName)
      .subscribe(
        {
          next: (response: createNewCVModel) => {
            this.newID = response.newId;
            this.getCVList();
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
