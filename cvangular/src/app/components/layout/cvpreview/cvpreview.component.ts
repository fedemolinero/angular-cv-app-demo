import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { resumeDataModel } from '@app/models/cv.model';
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";

@Component({
  selector: 'app-cv-preview',
  templateUrl: './cvpreview.component.html',
  styleUrls: ['./cvpreview.component.scss']
})
export class CvPreviewComponent {

  @Input() personalData!: resumeDataModel | null;

  @ViewChild('dataToExport1', { static: false }) public dataToExport1!: ElementRef;
  @ViewChild('dataToExport2', { static: false }) public dataToExport2!: ElementRef;

  constructor() { }


  public generatePdf(): void {
    let doc = new jsPDF({
      orientation: "landscape",
      unit: "mm", // Use milimeters to match a4 size
      format: 'a4'
    });

    // Función to add an imagen to PDF
    const addImageToPdf = (element: HTMLElement, x: number, y: number) => {
      return html2canvas(element).then(canvas => {
        let contentDataURL = canvas.toDataURL('image/jpeg', 1.0);

        // Dimensiones del PDF en milímetros
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();

        // Pixels dimension of the image
        const imageWidth = canvas.width;
        const imageHeight = canvas.height;

        // Convert pixels to mm (aprox for 72 DPI)
        const pxToMm = 25.4 / 72;
        let imgWidthMm = imageWidth * pxToMm;
        let imgHeightMm = imageHeight * pxToMm;

        // Image adjust if bigger than PDF size
        let scale = 1;
        if (imgWidthMm > pdfWidth) {
          scale = pdfWidth / imgWidthMm;
          imgWidthMm *= scale;
          imgHeightMm *= scale;
        }
        if (imgHeightMm > pdfHeight) {
          scale = pdfHeight / imgHeightMm;
          imgWidthMm *= scale;
          imgHeightMm *= scale;
        }

        // Add image to PDF
        doc.addImage(contentDataURL, 'JPEG', x, y, imgWidthMm, imgHeightMm);
      });
    };

    // Add first image
    addImageToPdf(this.dataToExport1.nativeElement, 0, 0).then(() => {
      // Add second image
      addImageToPdf(this.dataToExport2.nativeElement, 0, doc.internal.pageSize.getHeight() / 2).then(() => {
        // Save pdf with both images
        doc.save("FedeKpo.pdf");
      });
    });
  }


}