import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  private personalDataSubscription: Subscription | undefined;

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
      aboutDescriptions: [{ value: '', disabled: false }, Validators.required],
      jobs: [],
      studies: [],
      languages: [],
      courses: []
    });
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
}

