import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private colorSubject = new BehaviorSubject<boolean>(false);

  color$ = this.colorSubject.asObservable();
  
  setColorMode(color: boolean) {
    this.colorSubject.next(color);
  }
}
