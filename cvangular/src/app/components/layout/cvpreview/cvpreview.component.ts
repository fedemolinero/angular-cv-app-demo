import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('dataToExport', { static: false }) public dataToExport!: ElementRef;

  constructor() { }

  public generatePdf(): void {

    html2canvas(this.dataToExport.nativeElement).then(canvas => {

      const contentDataURL = canvas.toDataURL('image/jpeg', 1.0)

      let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode

      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);

      pdf.save('Filename.pdf');

    })
  }
  // var node = document.getElementById('parentdiv');

  // var img: HTMLImageElement;
  // var filename;
  // var newImage: string | HTMLImageElement | HTMLCanvasElement | Uint8Array | RGBAData;


  // domtoimage.toPng(this.dataToExport.nativeElement, { bgcolor: '#fff' })

  //   .then(function(dataUrl: string) {

  //     img = new Image();
  //     img.src = dataUrl;
  //     newImage = img.src;

  //     img.onload = function(){

  //     var pdfWidth = img.width;
  //     var pdfHeight = img.height;

  //       // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image
  //       var doc;
  //       if(pdfWidth > pdfHeight)
  //       {
  //         doc = new jsPDF('l', 'px', [pdfWidth , pdfHeight]);
  //       }
  //       else
  //       {
  //         doc = new jsPDF('p', 'px', [pdfWidth , pdfHeight]);
  //       }
  //       var width = doc.internal.pageSize.getWidth();
  //       var height = doc.internal.pageSize.getHeight();
  //       doc.addImage(newImage, 'PNG',  10, 10, width, height);
  //       filename = 'mypdf_' + '.pdf';
  //       doc.save(filename);
  //     };
  //   })
  //   .catch(function(error: any) {
  //    // Error Handling
  //   });

}