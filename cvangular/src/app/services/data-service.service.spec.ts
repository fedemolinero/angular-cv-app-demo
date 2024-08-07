// import { TestBed, inject } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { DataService } from './data-service.service';

// describe('DataService', () => {
//   let service: DataService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [DataService]
//     });

//     service = TestBed.inject(DataService);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpMock.verify(); // Verificar que no haya solicitudes pendientes
//   });

//   // it('should create the cv', () => {
//   //   const mockCvData = {
//   //     firstName: 'John',
//   //     lastName: 'Doe',
//   //     email: 'john.doe@example.com'
//   //   };

//   //   service.createNewCv(mockCvData).subscribe(
//   //     (response: any) => {
//   //       expect(response).toBeTruthy();
//   //       // Aquí puedes agregar más expectativas según la estructura de respuesta esperada
//   //     });

//   //   const req = httpMock.expectOne(`${service['apiUrl']}/api/cv/create-cv`);
//   //   expect(req.request.method).toBe('POST');
//   //   req.flush({}); // Puedes simular una respuesta vacía o con datos según necesites
//   // });
// });
