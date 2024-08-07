// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { WorkCardComponent } from './work-card.component';
// import { Work } from '@app/models/cv.model';

// describe('WorkCardComponent', () => {
//   let component: WorkCardComponent;
//   let fixture: ComponentFixture<WorkCardComponent>;

//   // Datos de prueba
//   const mockWork: Work = {
//     company: 'Tech Corp',
//     role: 'Software Engineer',
//     startDate: 'January 2020',
//     endDate: 'December 2022',
//     description: 'Developed various applications using Angular and Node.js.',
//     id: 0,
//     currentJob: false,
//     location: '',
//     sortOrderId: 0,
//     resumeId: 0,
//     createdAt: '',
//     updatedAt: ''
//   };

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [WorkCardComponent]
//     }).compileComponents();

//     fixture = TestBed.createComponent(WorkCardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should display work information correctly', () => {
//     // Asignar datos de prueba al componente
//     component.work = mockWork;
//     fixture.detectChanges(); // Detectar cambios para actualizar la vista

//     // Obtener elementos del DOM
//     const companyElement = fixture.nativeElement.querySelector('h4');
//     const roleElement = fixture.nativeElement.querySelector('h5');
//     const dateElement = fixture.nativeElement.querySelector('h6');
//     const descriptionElement = fixture.nativeElement.querySelector('pre');

//     // Verificar el contenido
//     expect(companyElement.textContent).toContain(mockWork.company);
//     expect(roleElement.textContent).toContain(mockWork.role);
//     expect(dateElement.textContent).toContain(`${mockWork.startDate} - ${mockWork.endDate}`);
//     expect(descriptionElement.textContent).toContain(mockWork.description);
//   });
// });
