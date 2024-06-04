import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-cv-preview',
  templateUrl: './cvpreview.component.html',
  styleUrls: ['./cvpreview.component.scss']
})
export class CvPreviewComponent {
  generatePdf() {
    const doc = new jsPDF();
    doc.text('This is my CV', 10, 10);
    doc.save('cv.pdf');
  }
}
