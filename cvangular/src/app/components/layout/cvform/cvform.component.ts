import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '@services/data-service.service';
import { resumeDataModel } from '@app/models/cv.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cvform',
  templateUrl: './cvform.component.html',
  styleUrls: ['./cvform.component.scss']
})
export class CvformComponent implements OnChanges, OnDestroy {

  @Output() formChanged = new EventEmitter<any>();
  @Input() cvData!: resumeDataModel;

  private personalDataSubscription!: Subscription;

  personForm!: FormGroup;
  savedSuccess!: string;

  constructor(
    private fb: FormBuilder,
    private personalDataService: DataService
  ) { this.initForm() }


  ngOnChanges(changes: SimpleChanges): void {

    if (changes['cvData'] && this.cvData) {

      // console.log('reseted', this.personForm.controls['skills'].value.length)

      this.personForm.reset();

      this.setFormArrays(this.cvData);

      this.personForm.patchValue(this.cvData);
    }
  }


  initForm() {
    this.personForm = this.fb.group({
      id: [],
      resumeId: [],
      userFirstName: ['', Validators.required],
      userLastName: [''],
      userHeading: [''],
      userEmail: ['', [Validators.required, Validators.email]],
      userAddress: [''],
      userPhoneNumber: [''],
      certifications: this.fb.array([]),
      education: this.fb.array([]),
      work: this.fb.array([]),
      skills: this.fb.array([]),
      links: this.fb.array([]),
      // projects: this.fb.array([]),
      // awards: this.fb.array([]),
    });
  }

  get certifications() { return this.personForm.get('certifications') as FormArray; }
  get education() { return this.personForm.get('education') as FormArray; }
  get work() { return this.personForm.get('work') as FormArray; }
  get skills() { return this.personForm.get('skills') as FormArray; }
  get links() { return this.personForm.get('links') as FormArray; }
  // get awards() { return this.personForm.get('awards') as FormArray; }
  // get projects() { return this.personForm.get('projects') as FormArray; }

  // Set form arrays with existing data
  private setFormArrays(data: resumeDataModel) {
    !!data.certifications ? this.setArrayValues(this.certifications, data.certifications, 'certifications') : this.certifications.clear();
    !!data.education ? this.setArrayValues(this.education, data.education, 'education') : this.education.clear();
    !!data.work ? this.setArrayValues(this.work, data.work, 'work') : this.work.clear();
    !!data.skills ? this.setArrayValues(this.skills, data.skills, 'skills') : this.skills.clear();
    !!data.links ? this.setArrayValues(this.links, data.links, 'links') : this.links.clear();
    // this.setArrayValues(this.projects, data.projects);
    // this.setArrayValues(this.awards, data.awards);
  }

  // Helper method to set array values
  private setArrayValues(formArray: FormArray, values: any[], itemToUpdate: string = '') {
    values.forEach(value => {
      if (itemToUpdate == 'certifications') {
        formArray.push(this.fb.group({
          id: [value.id],
          description: [value.description],
          issuedBy: [value.issuedBy],
          url: [value.url],
          sortOrderId: [value.sortOrderId]
        }));
      } else if (itemToUpdate == 'education') {
        formArray.push(this.fb.group({
          id: [value.id],
          degree: [value.degree],
          location: [value.location],
          resumeId: [value.resumeId],
          completionDate: [value.completionDate],
          createdAt: [value.createdAt],
          institution: [value.institution],
          score: [value.score],
          scoreType: [value.scoreType],
          sortOrderId: [value.sortOrderId],
          startDate: [value.startDate],
          studyType: [value.studyType],
          updatedAt: [value.updatedAt]
        }));
      } else if (itemToUpdate == 'work') {
        formArray.push(this.fb.group({
          id: [value.id],
          description: [value.description],
          endDate: [value.endDate],
          currentJob: [value.currentJob],
          role: [value.role],
          company: [value.company],
          location: [value.location],
          startDate: [value.startDate],
          sortOrderId: [value.sortOrderId],
          resumeId: [value.resumeId],
          createdAt: [value.createdAt],
          updatedAt: [value.updatedAt],
        }));
      } else if (itemToUpdate == 'skills') {
        formArray.push(this.fb.group({
          skillType: [value.skillType],
          skillValues: [value.skillValues],
        }));
      } else if (itemToUpdate == 'links') {
        formArray.push(this.fb.group({
          url: [value.url],
          network: [value.network],
        }));
      } else {
        formArray.push(this.fb.control(value));
      }

    });
  }

  // addAward() {
  //   this.awards.push(this.fb.control(''));
  // }

  // removeAward(index: number) {
  //   this.awards.removeAt(index);
  // }

  addCertification() {
    this.certifications.push(this.fb.group({
      id: [null],
      description: [''],
      issuedBy: [''],
      url: [''],
      sortOrderId: [0]
    }));
  }

  removeCertification(index: number) {
    this.certifications.removeAt(index);
  }

  addEducation() {
    this.education.push(this.fb.group({
      id: [null],
      degree: [],
      location: [],
      resumeId: [],
      completionDate: [],
      createdAt: [],
      institution: [],
      score: [],
      scoreType: [],
      sortOrderId: [],
      startDate: [],
      studyType: [],
      updatedAt: [],
    }));
  }

  removeEducation(index: number) {
    this.education.removeAt(index);
  }

  addWork() {
    this.work.push(this.fb.group({
      id: [],
      description: [],
      endDate: [],
      currentJob: [],
      role: [],
      location: [],
      company: [],
      startDate: [],
      sortOrderId: [],
      resumeId: [],
      createdAt: [],
      updatedAt: []
    }));
  }

  removeWork(index: number) {
    this.work.removeAt(index);
  }

  addSkill() {
    this.skills.push(this.fb.group({
      skillType: [],
      skillValues: []
    }));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  addLink() {
    this.links.push(this.fb.group({
      url: [],
      network: []
    }));
  }

  removeLink(index: number) {
    this.links.removeAt(index);
  }

  ngOnDestroy(): void {

    if (this.personalDataSubscription) {
      this.personalDataSubscription.unsubscribe();
    }
  }

  saveChanges() {

    if (this.personForm.valid) {

      this.postPersonalDataList(this.personForm.value);
      this.savedSuccess = 'Well done saving!!! It was successful.';

    } else {
      console.error('Formulario inválido');
    }
  }

  postPersonalDataList(personalData: resumeDataModel) {
    this.personalDataSubscription = this.personalDataService.saveCv(personalData)
      .subscribe({
        next: (response: string) => {
          console.log('saved', response);
        },
        error: (e) => {
          console.error(e);
        }
      });
  }

  // addProject() {
  //   this.projects.push(this.fb.control(''));
  // }

  // removeProject(index: number) {
  //   this.projects.removeAt(index);
  // }

}
