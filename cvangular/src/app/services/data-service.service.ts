import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resumeDataModel } from '@app/models/cv.model';
import { cvIdsModel } from '@app/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  saveCv(cvData: resumeDataModel): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/api/cv/save-cv`, cvData);
  }

  getCvById(id: number): Observable<resumeDataModel> {
    return this.http.get<resumeDataModel>(`${this.apiUrl}/api/cv/get-cv/${id}`);
  }

  getCvList(): Observable<cvIdsModel> {
    return this.http.get<cvIdsModel>(`${this.apiUrl}/api/cv/get-cv`);
  }

  createNewCv(filename: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/cv/create-cv/`, { filename });
  }

  deleteCv(nameID: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/api/cv/get-cv/${nameID}`);
  }

}
