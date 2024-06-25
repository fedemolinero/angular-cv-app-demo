// popup.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private showPopupSubject: BehaviorSubject<{ show: boolean, message: string }> = new BehaviorSubject<{ show: boolean, message: string }>({ show: false, message: '' });

  constructor() {}

  get showPopup$(): Observable<{ show: boolean, message: string }> {
    return this.showPopupSubject.asObservable();
  }

  setShowPopup(show: boolean, message: string = ''): void {
    this.showPopupSubject.next({ show, message });
  }
}
