import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-cvform',
  templateUrl: './cvform.component.html',
  styleUrl: './cvform.component.scss'
})
export class CvformComponent implements OnInit, OnDestroy {
  productId!: number;
  productForm!: FormGroup;
  savedSuccess!: string;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) { }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.productForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: [{ value: '', disabled: false }, Validators.required],
      secondName: [{ value: '', disabled: false }, Validators.required],
      lastname: [{ value: '', disabled: false }, Validators.required],
      city: [{ value: '', disabled: false }, Validators.required],
      position: [{ value: '', disabled: false }, Validators.required],
      aboutDescription1: [{ value: '', disabled: false }, Validators.required],
      job1: []
    });
  }

  saveChanges() {
    if (this.productForm.valid) {
      console.log('Form Data:', this.productForm.value);
      console.log('Save Complete');
      this.savedSuccess = 'Well done saving!!! It was succeess no fail';
    } else {
      console.error('Formulario inválido');
    }
  }
}

