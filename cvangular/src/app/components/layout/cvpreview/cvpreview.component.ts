import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { resumeDataModel } from '@app/models/cv.model';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-cv-preview',
  templateUrl: './cvpreview.component.html',
  styleUrls: ['./cvpreview.component.scss']
})
export class CvPreviewComponent {

  @Input() personalData!: resumeDataModel | null;

  constructor() { }

  // public generatePdf(): void {
  //   const doc = new jsPDF();

  //   doc.text(this.personalData.userFirstName, 11, 11);
  //   doc.text(this.personalData.userLastName, 11, 22);

  //   // doc.text('This is a sample PDF generated by jsPDF.', 10, 20);
  //   doc.save('document.pdf');
  // }
}