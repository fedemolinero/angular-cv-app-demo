import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '@models/person.model';
import { resumeDataModel } from '@app/models/cv.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  createCv(cvData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/cv/create-cv`, cvData);
  }

  getCv(id: string): Observable<resumeDataModel> {
    return this.http.get<resumeDataModel>(`${this.apiUrl}/api/cv/get-cv/${id}`);
  }

  getCvList() {
    return this.http.get<any>(`${this.apiUrl}/api/cv/get-cv`);
  }
}
