// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { By } from '@angular/platform-browser';
// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';
// import { ColorTogglerComponent } from './color-toggler.component';
// import { TemplateService } from '@services/template.service';

// describe('ColorTogglerComponent', () => {
//   let component: ColorTogglerComponent;
//   let fixture: ComponentFixture<ColorTogglerComponent>;
//   let templateService: TemplateService;
//   let destroy$: Subject<void>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ColorTogglerComponent],
//       imports: [BrowserAnimationsModule], // Importar BrowserAnimationsModule para las animaciones
//       providers: [TemplateService]
//     })
//       .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ColorTogglerComponent);
//     component = fixture.componentInstance;
//     component.flipState = 'inactive';
//     templateService = TestBed.inject(TemplateService);
//     destroy$ = new Subject<void>();
//     fixture.detectChanges();
//   });

//   afterEach(() => {
//     destroy$.next();
//     destroy$.complete();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   // it('initial flipState should be inactive', () => {
//   //   expect(component.flipState).toBe('inactive');
//   // });

//   it('should toggle flipState and call setColorMode', () => {
//     spyOn(templateService, 'setColorMode');
//     const toggleButton = fixture.debugElement.query(By.css('.tp-box'));
//     toggleButton.triggerEventHandler('click', null);
//     expect(component.flipState).toBe('inactive');
//     expect(templateService.setColorMode).toHaveBeenCalledWith('inactive');
//   });

//   it('should update flipState on color$ subscription', () => {
//     templateService.setColorMode('active');
//     templateService.color$.pipe(takeUntil(destroy$)).subscribe(() => {
//       expect(component.flipState).toBe('active');
//     });
//   });


//   it('should unsubscribe onDestroy', () => {
//     spyOn(component['destroy$'], 'next');
//     spyOn(component['destroy$'], 'complete');

//     component.ngOnDestroy();

//     expect(component['destroy$'].next).toHaveBeenCalled();
//     expect(component['destroy$'].complete).toHaveBeenCalled();
//   });
// });
