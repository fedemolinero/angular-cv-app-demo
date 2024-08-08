import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '@services/data-service.service';
import { resumeDataModel } from '@app/models/cv.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cvform',
  templateUrl: './cvform.component.html',
  styleUrls: ['./cvform.component.scss']
})
export class CvformComponent implements OnChanges, OnDestroy {

  @Output() formChanged = new EventEmitter<any>();
  @Input() cvData!: resumeDataModel;

  private destroy$ = new Subject<void>();
  personForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private personalDataService: DataService
  ) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cvData'] && this.cvData) {
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
    });
  }

  get certifications() { return this.personForm.get('certifications') as FormArray; }
  get education() { return this.personForm.get('education') as FormArray; }
  get work() { return this.personForm.get('work') as FormArray; }
  get skills() { return this.personForm.get('skills') as FormArray; }
  get links() { return this.personForm.get('links') as FormArray; }

  private setFormArrays(data: resumeDataModel) {
    this.clearFormArrays();
    this.setArrayValues(this.certifications, data.certifications, 'certifications');
    this.setArrayValues(this.education, data.education, 'education');
    this.setArrayValues(this.work, data.work, 'work');
    this.setArrayValues(this.skills, data.skills, 'skills');
    this.setArrayValues(this.links, data.links, 'links');
  }

  private setArrayValues(formArray: FormArray, values: any[], itemType: string) {
    values.forEach(value => {
      formArray.push(this.fb.group(this.getFormGroupControls(itemType, value)));
    });
  }

  private getFormGroupControls(type: string, value: any) {
    const commonControls = {
      id: [value.id],
      sortOrderId: [value.sortOrderId]
    };

    switch (type) {
      case 'certifications':
        return {
          ...commonControls,
          description: [value.description],
          issuedBy: [value.issuedBy],
          url: [value.url]
        };
      case 'education':
        return {
          ...commonControls,
          degree: [value.degree],
          location: [value.location],
          resumeId: [value.resumeId],
          completionDate: [value.completionDate],
          createdAt: [value.createdAt],
          institution: [value.institution],
          score: [value.score],
          scoreType: [value.scoreType],
          startDate: [value.startDate],
          studyType: [value.studyType],
          updatedAt: [value.updatedAt]
        };
      case 'work':
        return {
          ...commonControls,
          description: [value.description],
          endDate: [value.endDate],
          currentJob: [value.currentJob],
          role: [value.role],
          company: [value.company],
          location: [value.location],
          startDate: [value.startDate],
          resumeId: [value.resumeId],
          createdAt: [value.createdAt],
          updatedAt: [value.updatedAt]
        };
      case 'skills':
        return {
          skillType: [value.skillType],
          skillValues: [value.skillValues]
        };
      case 'links':
        return {
          url: [value.url],
          network: [value.network]
        };
      default:
        return {};
    }
  }

  addItem(formArray: FormArray, itemType: string) {
    formArray.push(this.fb.group(this.getFormGroupControls(itemType, {})));
  }

  removeItem(formArray: FormArray, index: number) {
    formArray.removeAt(index);
  }

  addCertification() { this.addItem(this.certifications, 'certifications'); }
  removeCertification(index: number) { this.removeItem(this.certifications, index); }
  addEducation() { this.addItem(this.education, 'education'); }
  removeEducation(index: number) { this.removeItem(this.education, index); }
  addWork() { this.addItem(this.work, 'work'); }
  removeWork(index: number) { this.removeItem(this.work, index); }
  addSkill() { this.addItem(this.skills, 'skills'); }
  removeSkill(index: number) { this.removeItem(this.skills, index); }
  addLink() { this.addItem(this.links, 'links'); }
  removeLink(index: number) { this.removeItem(this.links, index); }

  private clearFormArrays() {
    this.certifications.clear();
    this.education.clear();
    this.work.clear();
    this.skills.clear();
    this.links.clear();
  }

  saveChanges() {
    if (this.personForm.valid) {
      this.postPersonalDataList(this.personForm.value);
    } else {
      console.error('Formulario inválido');
    }
  }

  private postPersonalDataList(personalData: resumeDataModel) {
    this.personalDataService.saveCv(personalData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: string) => {
          console.log('saved', response);
          this.formChanged.emit(response);
        },
        error: (e) => {
          console.error(e);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
