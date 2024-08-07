// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { AuthService } from './auth.service';
// import { Router } from '@angular/router';
// import { ResponseModel } from '@app/models/response.model';

// describe('AuthService', () => {
//     let authService: AuthService;
//     let httpMock: HttpTestingController;
//     let router: Router;

//     const apiUrl = 'http://localhost:3000'; // Mock apiUrl for testing

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 HttpClientTestingModule // Import HttpClientTestingModule for mocking HTTP requests
//             ],
//             providers: [
//                 AuthService,
//                 { provide: 'API_URL', useValue: apiUrl } // Provide apiUrl as a mock value
//             ]
//         });

//         authService = TestBed.inject(AuthService);
//         httpMock = TestBed.inject(HttpTestingController);
//         router = TestBed.inject(Router); // You can inject Router if needed
//     });

//     afterEach(() => {
//         httpMock.verify(); // Verify that there are no outstanding HTTP requests after each test
//     });

//     it('should be created', () => {
//         expect(authService).toBeTruthy();
//     });

//     it('should register user successfully', () => {
//         const mockResponse: ResponseModel = { token: 'mockToken' };

//         authService.register('testuser', 'password').subscribe(response => {
//             expect(response).toEqual(mockResponse);
//         });

//         const req = httpMock.expectOne(`${apiUrl}/api/auth/register`);
//         expect(req.request.method).toBe('POST');
//         req.flush(mockResponse);
//     });

//     it('should login user successfully', () => {
//         const mockResponse: ResponseModel = { token: 'mockToken' };

//         authService.login('testuser', 'password').subscribe(response => {
//             expect(response).toEqual(mockResponse);
//             expect(authService.isAuthenticated()).toBe(true);
//         });

//         const req = httpMock.expectOne(`${apiUrl}/api/auth/login`);
//         expect(req.request.method).toBe('POST');
//         req.flush(mockResponse);
//     });


//     it('should logout user successfully', () => {
//         // Ensure isAuthenticated$ is false before logout
//         authService.removeToken();
//         expect(authService.isAuthenticated()).toBe(false);

//         // Perform logout
//         authService.logout();

//         // Expect isAuthenticated$ to be false after logout
//         authService.isAuthenticatedUser$.subscribe(isAuthenticatedUser => {
//             expect(isAuthenticatedUser).toBe(false);
//         });
//     });

//     it('should set and get token successfully', () => {
//         const mockToken = 'mockToken';

//         // Set token
//         authService.setToken(mockToken);

//         // Get token
//         const retrievedToken = authService.getToken();

//         // Expect retrieved token to match set token
//         expect(retrievedToken).toBe(mockToken);

//         // Remove token
//         authService.removeToken();

//         // Expect token to be null after removal
//         expect(authService.getToken()).toBeNull();
//     });

//     it('should check authentication status correctly', () => {
//         // Initially, there should be no token
//         authService.removeToken();
//         expect(authService.isAuthenticated()).toBe(false);

//         // Set a token
//         authService.setToken('mockToken');

//         // After setting a token, isAuthenticated should return true
//         expect(authService.isAuthenticated()).toBe(true);

//         // Remove token
//         authService.removeToken();

//         // After removing the token, isAuthenticated should return false again
//         expect(authService.isAuthenticated()).toBe(false);
//     });



//     it('should refresh token successfully', () => {
//         const mockResponse: ResponseModel = { token: 'refreshedToken' };
//         const mockRefreshToken = 'mockRefreshToken';

//         spyOn(authService, 'getToken').and.returnValue(mockRefreshToken);
//         spyOn(authService, 'setToken');

//         authService.refreshToken().subscribe(token => {
//             expect(token).toBe(mockResponse.token);
//             expect(authService.isAuthenticated()).toBe(true); // Verificar estado de autenticación
//         });

//         const req = httpMock.expectOne(`${apiUrl}/api/auth/refresh-token`);
//         expect(req.request.method).toBe('POST');
//         req.flush(mockResponse);
//     });

//     it('should handle case when no refresh token is available', () => {
//         spyOn(authService, 'getToken').and.returnValue(null);

//         authService.refreshToken().subscribe({
//             error: error => {
//                 expect(error).toBe('No hay refresh token disponible');
//             }
//         });

//         httpMock.expectNone(`${apiUrl}/api/auth/refresh-token`);
//     });

//     it('should handle error during token refresh', () => {
//         const errorMessage = 'Unauthorized';
//         const errorResponse = { status: 401, statusText: errorMessage };

//         const mockRefreshToken = 'mockRefreshToken';
//         spyOn(authService, 'getToken').and.returnValue(mockRefreshToken);

//         authService.refreshToken().subscribe({
//             error: error => {
//                 expect(error).toBe('Error al renovar el token');
//             }
//         });

//         const req = httpMock.expectOne(`${apiUrl}/api/auth/refresh-token`);
//         expect(req.request.method).toBe('POST');
//         req.flush({}, errorResponse);
//     });

//     it('should handle unexpected error during token refresh', () => {
//         const errorMessage = 'Internal Server Error';
//         const errorResponse = { status: 500, statusText: errorMessage };

//         const mockRefreshToken = 'mockRefreshToken';
//         spyOn(authService, 'getToken').and.returnValue(mockRefreshToken);

//         authService.refreshToken().subscribe({
//             error: error => {
//                 expect(error).toBe('Error al renovar el token');
//             }
//         });

//         const req = httpMock.expectOne(`${apiUrl}/api/auth/refresh-token`);
//         expect(req.request.method).toBe('POST');
//         req.flush({}, errorResponse);
//     });


// });
