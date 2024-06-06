import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/cvPersonalData.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createCv(cvData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-cv`, cvData);
  }

  getCv(): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/get-cv`);
  }
}
