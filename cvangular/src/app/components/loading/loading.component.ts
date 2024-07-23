import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
<div class="loading-spinner">
  <div class="spinner-border text-white" role="status">
    <span id="loading-status" class="visually-hidden"></span>
  </div>
  <span id="loading-message" class="p-3 m-3 text-white" *ngIf="message" aria-live="assertive">{{ message }}</span>
  <span class="visually-hidden">Cargando...</span>
</div>
`,
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {

  @Input() message!: string;
  @Input() backgroundColor: string = '#0d6efd'; // Color por defecto

}
