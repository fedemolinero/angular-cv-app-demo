import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '@services/data-service.service';
import { resumeDataModel } from '@app/models/cv.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cvform',
  templateUrl: './cvform.component.html',
  styleUrls: ['./cvform.component.scss']
})
export class CvformComponent implements OnDestroy, OnChanges {

  @Output() formChanged = new EventEmitter<any>();
  @Input() cvData!: resumeDataModel;

  private personalDataSubscription!: Subscription;

  personForm!: FormGroup;
  savedSuccess!: string;

  constructor(
    private fb: FormBuilder,
    private personalDataService: DataService
  ) {
    this.personForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      userFirstName: ['', Validators.required],
      userLastName: [''],
      userHeading: [''],
      userEmail: ['', [Validators.required, Validators.email]],
      userAddress: [''],
      userPhoneNumber: [''],
      resumeId: [0],
      uuid: [''],
      templateId: [0],
      cvName: [''],
      inReview: [false],
      isShared: [false],
      updatedAfterReview: [false],
      createdAt: [''],
      updatedAt: [''],
      templateUrl: [''],
      activeReviewId: [0],
      inAiReview: [false],
      reviewDone: [false],
      userReviewFeedbackDone: [false],
      awards: this.fb.array([]),
      certifications: this.fb.array([]),
      education: this.fb.array([]),
      work: this.fb.array([]),
      projects: this.fb.array([]),
      skills: this.fb.array([]),
      links: this.fb.array([]),
      user: this.fb.group({
        id: [0],
        uid: [0],
        name: [''],
        role: [''],
        companyName: [''],
        lastActiveToken: [''],
        createdAt: [''],
        updatedAt: [''],
        lastNotificationCheck: [''],
        incompleteResumeEmailCount: [0],
        reviewer: [false],
        reviewCredits: [0],
        uploadCredits: [0],
        reviewOnboardingDone: [false],
        hacker_id: [0],
        username: [''],
        email: [''],
        secondary_emails: this.fb.array([]),
        banners: this.fb.group({}),
        credits: this.fb.group({
          uploadCredits: [0],
          reviewCredits: [0]
        }),
        existingResume: this.fb.group({})
      }),
      userId: [0],
      review: [null]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cvData'] && this.cvData) {
      this.personForm.patchValue(this.cvData);
    }
  }

  ngOnDestroy(): void {
    if (this.personalDataSubscription) {
      this.personalDataSubscription.unsubscribe();
    }
  }

  onInputChange() {
    this.formChanged.emit(this.personForm);
  }

  saveChanges() {
    if (this.personForm.valid) {
      console.log('Form Data:', this.personForm.value);
      this.postPersonalDataList(this.personForm.value);
      console.log('Save Complete');
      this.savedSuccess = 'Well done saving!!! It was successful.';
    } else {
      console.error('Formulario inválido');
    }
  }

  postPersonalDataList(personalData: resumeDataModel) {
    this.personalDataSubscription = this.personalDataService.createCv(personalData)
      .subscribe({
        next: (response: any) => {
          console.log('created', response);
        },
        error: (e) => {
          console.error(e);
        }
      });
  }

  get userFirstName() { return this.personForm.get('userFirstName'); }

}
