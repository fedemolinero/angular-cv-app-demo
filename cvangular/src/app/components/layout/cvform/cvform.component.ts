import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '@services/data-service.service';
import { resumeDataModel } from '@app/models/cv.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cvform',
  templateUrl: './cvform.component.html',
  styleUrls: ['./cvform.component.scss']
})
export class CvformComponent implements OnInit, OnChanges, OnDestroy {

  @Output() formChanged = new EventEmitter<any>();
  @Input() cvData!: resumeDataModel;

  private personalDataSubscription!: Subscription;

  personForm!: FormGroup;
  savedSuccess!: string;

  constructor(
    private fb: FormBuilder,
    private personalDataService: DataService
  ) { }

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cvData'] && this.cvData) {
      this.personForm.patchValue(this.cvData);
    }
  }


  ngOnInit(): void {
    this.initForm();

    if (this.cvData) {
      this.personForm.patchValue(this.cvData);
      this.setFormArrays(this.cvData);
    }
  }

  ngOnDestroy(): void {
    if (this.personalDataSubscription) {
      this.personalDataSubscription.unsubscribe();
    }
  }

  initForm() {
    this.personForm = this.fb.group({
      userFirstName: ['', Validators.required],
      userLastName: [''],
      userHeading: [''],
      userEmail: ['', [Validators.required, Validators.email]],
      userAddress: [''],
      userPhoneNumber: [''],
      awards: this.fb.array([]),
      certifications: this.fb.array([]),
      education: this.fb.array([]),
      work: this.fb.array([]),
      projects: this.fb.array([]),
      skills: this.fb.array([]),
      links: this.fb.array([]),
    });
  }

  get awards() { return this.personForm.get('awards') as FormArray; }
  get certifications() { return this.personForm.get('certifications') as FormArray; }
  get education() { return this.personForm.get('education') as FormArray; }
  get work() { return this.personForm.get('work') as FormArray; }
  get projects() { return this.personForm.get('projects') as FormArray; }
  get skills() { return this.personForm.get('skills') as FormArray; }
  get links() { return this.personForm.get('links') as FormArray; }

  // Set form arrays with existing data
  private setFormArrays(data: resumeDataModel) {
    this.setArrayValues(this.awards, data.awards);
    this.setArrayValues(this.certifications, data.certifications);
    this.setArrayValues(this.education, data.education);
    this.setArrayValues(this.work, data.work);
    this.setArrayValues(this.projects, data.projects);
    this.setArrayValues(this.skills, data.skills);
    this.setArrayValues(this.links, data.links);
  }

  // Helper method to set array values
  private setArrayValues(formArray: FormArray, values: any[], isComplex = false) {
    values.forEach(value => {
      if (isComplex) {
        formArray.push(this.fb.group({
          id: [value.id],
          description: [value.description],
          issuedBy: [value.issuedBy],
          url: [value.url],
          sortOrderId: [value.sortOrderId]
        }));
      } else {
        formArray.push(this.fb.control(value));
      }
    });
  }

  addAward() {
    this.awards.push(this.fb.control(''));
  }

  removeAward(index: number) {
    this.awards.removeAt(index);
  }


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
    this.education.push(this.fb.control(''));
  }

  removeEducation(index: number) {
    this.education.removeAt(index);
  }

  addWork() {
    this.work.push(this.fb.control(''));
  }

  removeWork(index: number) {
    this.work.removeAt(index);
  }

  addProject() {
    this.projects.push(this.fb.control(''));
  }

  removeProject(index: number) {
    this.projects.removeAt(index);
  }

  addSkill() {
    this.skills.push(this.fb.control(''));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  addLink() {
    this.links.push(this.fb.control(''));
  }

  removeLink(index: number) {
    this.links.removeAt(index);
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

  onInputChange() {
    this.formChanged.emit(this.personForm);
  }
}
