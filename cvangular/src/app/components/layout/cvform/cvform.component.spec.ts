// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
// import { CvformComponent } from './cvform.component';

// describe('CvformComponent', () => {
//   let component: CvformComponent;
//   let fixture: ComponentFixture<CvformComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [CvformComponent],
//       imports: [ReactiveFormsModule],
//       providers: [FormBuilder]
//     })
//       .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CvformComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have a defined form', () => {
//     expect(component.personForm).toBeDefined();
//   });

//   it('should create form with all fields', () => {
//     const form = component.personForm;
//     expect(form.contains('userFirstName')).toBeTrue();
//     expect(form.contains('userLastName')).toBeTrue();
//     expect(form.contains('userHeading')).toBeTrue();
//     expect(form.contains('userEmail')).toBeTrue();
//     expect(form.contains('userAddress')).toBeTrue();
//     expect(form.contains('userPhoneNumber')).toBeTrue();
//     expect(form.contains('education')).toBeTrue();
//     expect(form.contains('work')).toBeTrue();
//     expect(form.contains('certifications')).toBeTrue();
//     expect(form.contains('skills')).toBeTrue();
//     expect(form.contains('links')).toBeTrue();
//   });

//   //   it('should validate user email field', () => {
//   //     const emailControl = component.personForm.get('userEmail');
//   //     emailControl.setValue('invalid-email');
//   //     expect(emailControl.valid).toBeFalse();
//   //     emailControl.setValue('test@example.com');
//   //     expect(emailControl.valid).toBeTrue();
//   //   });

//   it('should add and remove education fields', () => {
//     const educationArray = component.personForm.get('education') as FormArray;
//     expect(educationArray.length).toBe(0);
//     component.addEducation();
//     expect(educationArray.length).toBe(1);
//     component.removeEducation(0);
//     expect(educationArray.length).toBe(0);
//   });

//   it('should add and remove work fields', () => {
//     const workArray = component.personForm.get('work') as FormArray;
//     expect(workArray.length).toBe(0);
//     component.addWork();
//     expect(workArray.length).toBe(1);
//     component.removeWork(0);
//     expect(workArray.length).toBe(0);
//   });

//   it('should add and remove certification fields', () => {
//     const certificationsArray = component.personForm.get('certifications') as FormArray;
//     expect(certificationsArray.length).toBe(0);
//     component.addCertification();
//     expect(certificationsArray.length).toBe(1);
//     component.removeCertification(0);
//     expect(certificationsArray.length).toBe(0);
//   });

//   it('should add and remove skill fields', () => {
//     const skillsArray = component.personForm.get('skills') as FormArray;
//     expect(skillsArray.length).toBe(0);
//     component.addSkill();
//     expect(skillsArray.length).toBe(1);
//     component.removeSkill(0);
//     expect(skillsArray.length).toBe(0);
//   });

//   it('should add and remove link fields', () => {
//     const linksArray = component.personForm.get('links') as FormArray;
//     expect(linksArray.length).toBe(0);
//     component.addLink();
//     expect(linksArray.length).toBe(1);
//     component.removeLink(0);
//     expect(linksArray.length).toBe(0);
//   });

//   it('should call saveChanges on form submission', () => {
//     spyOn(component, 'saveChanges');
//     const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
//     button.click();
//     expect(component.saveChanges).toHaveBeenCalled();
//   });
// });
