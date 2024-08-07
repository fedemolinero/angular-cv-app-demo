import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resumeDataModel } from '@app/models/cv.model';
import { cvIdsModel } from '@app/models/response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = environment.apiUrl; // Usa la URL desde el archivo de configuración

  constructor(private http: HttpClient) { }

  saveCv(cvData: resumeDataModel): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/cv/save-cv`, cvData);
  }

  getCvById(id: number): Observable<resumeDataModel> {
    return this.http.get<resumeDataModel>(`${this.apiUrl}/cv/get-cv/${id}`);
  }

  getCvList(): Observable<cvIdsModel> {
    return this.http.get<cvIdsModel>(`${this.apiUrl}/cv/get-cv`);
  }

  createNewCv(filename: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cv/create-cv/`, { filename });
  }

  deleteCv(nameID: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/cv/get-cv/${nameID}`);
  }

}
