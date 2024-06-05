import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data-service.service';
import { Person } from '../models/cvPersonalData.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cvform',
  templateUrl: './cvform.component.html',
  styleUrl: './cvform.component.scss'
})
export class CvformComponent implements OnInit, OnDestroy {
  productId!: number;
  productForm!: FormGroup;
  savedSuccess!: string;
  private personalDataSubscription!: Subscription;

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
    this.productForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: [{ value: '', disabled: false }, Validators.required],
      secondName: [{ value: '', disabled: false }, Validators.required],
      lastname: [{ value: '', disabled: false }, Validators.required],
      city: [{ value: '', disabled: false }, Validators.required],
      position: [{ value: '', disabled: false }, Validators.required],
      // aboutDescriptions: [{ value: '', disabled: false }, Validators.required],
      // aboutDescriptions: this.fb.group({
      //   street: [{ value: '', disabled: false }, Validators.required],
      //   city: [{ value: '', disabled: false }, Validators.required],
      //   state:[{ value: '', disabled: false }, Validators.required],
      //   zip: [{ value: '', disabled: false }, Validators.required],
      // }),
      aboutDescriptions: this.fb.array([this.fb.control('')]),
      jobs: [],
      studies: [],
      languages: [],
      courses: []
    });

    this.productForm.valueChanges
      .subscribe(value => {
        this.formChanged.emit(value);
      });
  }

  get aboutDescriptions() {
    return this.productForm.get('aboutDescriptions') as FormArray;
  }

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


  saveChanges() {
    if (this.productForm.valid) {
      console.log('Form Data:', this.productForm.value);
      this.postPersonalDataList(this.productForm.value)
      console.log('Save Complete');
      this.savedSuccess = 'Well done saving!!! It was succeess no fail';
    } else {
      console.error('Formulario inválido');
    }
  }

  @Output() formChanged = new EventEmitter<any>();

  onInputChange() {
    this.formChanged.emit(this.productForm);
  }

}

