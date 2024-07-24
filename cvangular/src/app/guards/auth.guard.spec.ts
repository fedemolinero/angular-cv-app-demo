// import { TestBed } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { authGuard } from '../guards/auth.guard'; // Assuming your guard is in './guards/auth.guard'
// import { AuthService } from '../services/auth.service'; // Assuming your service is in './services/auth.service'
// import { RouterModule, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('AuthGuard', () => {
//   let guard: any; // any is used here because authGuard is a CanActivateFn, not a class

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         HttpClientTestingModule,
//         RouterModule.forRoot([]) // Import RouterModule with an empty routes array
//       ],
//       providers: [

//         AuthService, // Provide AuthService which is used by the guard
//         {
//           provide: authGuard, // Provide the authGuard token
//           useValue: authGuard // Use the actual authGuard function
//         }
//       ]
//     });
//     guard = TestBed.inject(authGuard); // Get the guard instance from the TestBed
//   });

//   it('should be created', () => {
//     expect(guard).toBeTruthy();
//   });

//   it('should allow access when user is authenticated', () => {
//     const authService = TestBed.inject(AuthService);
//     spyOn(authService, 'isAuthenticated').and.returnValue(true); // Simulate successful authentication

//     const canActivate = guard(null, null); // Call the guard directly
//     expect(canActivate).toEqual(true); // Should allow access (return true)
//   });

//   it('should redirect to /login when user is not authenticated', () => {
//     const authService = TestBed.inject(AuthService);
//     const router = TestBed.inject(Router);
//     spyOn(authService, 'isAuthenticated').and.returnValue(false); // Simulate user not authenticated
//     const navigateSpy = spyOn(router, 'navigate'); // Spy on router navigate method

//     const canActivate = guard(null, null); // Call the guard directly
//     expect(canActivate).toEqual(false); // Should deny access (return false)
//     expect(navigateSpy).toHaveBeenCalledWith(['/login']); // Should navigate to '/login'
//   });
// });
