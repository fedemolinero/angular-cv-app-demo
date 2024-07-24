import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PopupMessage {
  id: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private showPopupSubject: BehaviorSubject<{ show: boolean, messages: PopupMessage[] }> = new BehaviorSubject<{ show: boolean, messages: PopupMessage[] }>({ show: false, messages: [] });
  private idCounter: number = 0;

  constructor() { }

  get showPopup$(): Observable<{ show: boolean, messages: PopupMessage[] }> {
    return this.showPopupSubject.asObservable();
  }

  addErrorMessage(message: string): void {
    const currentState = this.showPopupSubject.value;
    const newMessage: PopupMessage = { id: this.idCounter++, message: message };
    this.showPopupSubject.next({ show: true, messages: [...currentState.messages, newMessage] });

    setTimeout(() => {
      this.removeErrorMessage(newMessage.id);
    }, 30000); // Cerrar el popup después de 30 segundos
  }

  removeErrorMessage(id: number): void {
    const currentState = this.showPopupSubject.value;
    const updatedMessages = currentState.messages.filter(msg => msg.id !== id);
    this.showPopupSubject.next({ show: updatedMessages.length > 0, messages: updatedMessages });
  }
}
