// popup.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private showPopupSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  get showPopup$(): Observable<boolean> {
    return this.showPopupSubject.asObservable();
  }

  setShowPopup(value: boolean): void {
    this.showPopupSubject.next(value);
  }
}
