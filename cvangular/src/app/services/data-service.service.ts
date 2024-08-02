import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resumeDataModel } from '@app/models/cv.model';
import { ResumeModel } from '@app/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  saveCv(cvData: resumeDataModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/cv/save-cv`, cvData);
  }

  getCvById(id: string): Observable<resumeDataModel> {
    return this.http.get<resumeDataModel>(`${this.apiUrl}/api/cv/get-cv/${id}`);
  }

  getCvList() {
    return this.http.get<any>(`${this.apiUrl}/api/cv/get-cv`);
  }

  createNewCv(cvname: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/cv/create-cv`, cvname);
  }

  

}
