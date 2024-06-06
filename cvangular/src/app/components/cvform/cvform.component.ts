import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data-service.service';
import { Person } from '../../models/cvPersonalData.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cvform',
  templateUrl: './cvform.component.html',
  styleUrl: './cvform.component.scss'
})
export class CvformComponent implements OnInit, OnDestroy {

  @Output() formChanged = new EventEmitter<any>();
  private personalDataSubscription!: Subscription;

  productId!: number;
  personForm!: FormGroup;
  savedSuccess!: string;

  constructor(
    private fb: FormBuilder,
    private personalDataService: DataService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    if (this.personalDataSubscription) {
      this.personalDataSubscription?.unsubscribe();
    }
  }

  initForm() {
    this.personForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: [{ value: '', disabled: false }, Validators.required],
      secondName: [{ value: '', disabled: false }, Validators.required],
      lastName: [{ value: '', disabled: false }, Validators.required],
      city: [{ value: '', disabled: false }, Validators.required],
      position: [{ value: '', disabled: false }, Validators.required],
      aboutDescriptions: this.fb.array([this.fb.control('')]),
      jobs: [],
      studies: [],
      languages: [],
      courses: []
    });

    this.personForm.valueChanges
      .subscribe(value => {
        this.formChanged.emit(value);
      });
  }

  get name() { return this.personForm.get('name'); }
  get lastName() { return this.personForm.get('lastName'); }
  get city() { return this.personForm.get('city'); }
  get position() { return this.personForm.get('position'); }
  get aboutDescriptions() { return this.personForm.get('aboutDescriptions') as FormArray; }

  addAboutDescription() {
    this.aboutDescriptions.push(this.fb.control(''));
  }

  removeAboutDescription(index: number) {
    this.aboutDescriptions.removeAt(index);
  }

  postPersonalDataList(personalData: Person) {
    this.personalDataSubscription = this.personalDataService.createCv(personalData)
      .subscribe(
        {
          next: (response: any) => {
            console.log('created', response)
          },
          error: (e) => {
            console.error(e);
          }
        }
      );
  }

  onInputChange() {
    this.formChanged.emit(this.personForm);
  }

  saveChanges() {
    if (this.personForm.valid) {
      console.log('Form Data:', this.personForm.value);
      this.postPersonalDataList(this.personForm.value)
      console.log('Save Complete');
      this.savedSuccess = 'Well done saving!!! It was succeess no fail';
    } else {
      console.error('Formulario inválido');
    }
  }


}

