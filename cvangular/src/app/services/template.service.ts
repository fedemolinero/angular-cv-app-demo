import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private colorSubject = new BehaviorSubject<string>('');

  color$ = this.colorSubject.asObservable();
  
  setColorMode(color: string) {
    this.colorSubject.next(color);
  }
}
