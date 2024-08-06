import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { resumeDataModel } from '@app/models/cv.model';
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import { isAbsolute } from 'path';

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
      unit: "mm", // Usar milímetros para que coincida con el tamaño A4
      format: 'a4'
    });
  
    // Función para agregar una imagen al PDF
    const addImageToPdf = (element: HTMLElement, x: number, y: number) => {
      return html2canvas(element).then(canvas => {
        let contentDataURL = canvas.toDataURL('image/jpeg', 1.0);
  
        // Dimensiones del PDF en milímetros
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
  
        // Dimensiones de la imagen en píxeles
        const imageWidth = canvas.width;
        const imageHeight = canvas.height;
  
        // Convertir píxeles a milímetros (aproximadamente, para 72 DPI)
        const pxToMm = 25.4 / 72;
        let imgWidthMm = imageWidth * pxToMm;
        let imgHeightMm = imageHeight * pxToMm;
  
        // Ajustar el tamaño de la imagen si es más grande que el tamaño del PDF
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
  
        // Agregar la imagen al PDF
        doc.addImage(contentDataURL, 'JPEG', x, y, imgWidthMm, imgHeightMm);
      });
    };
  
    // Agregar la primera imagen
    addImageToPdf(this.dataToExport1.nativeElement, 0, 0).then(() => {
      // Agregar la segunda imagen
      addImageToPdf(this.dataToExport2.nativeElement, 0, doc.internal.pageSize.getHeight() / 2).then(() => {
        // Guardar el PDF después de agregar ambas imágenes
        doc.save("two-by-four.pdf");
      });
    });
  }

  
}