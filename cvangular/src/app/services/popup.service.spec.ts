import { TestBed } from '@angular/core/testing';
import { PopupService, PopupMessage } from './popup.service';
import { BehaviorSubject } from 'rxjs';

describe('PopupService', () => {
  let service: PopupService;
  let showPopupSubject: BehaviorSubject<{ show: boolean, messages: PopupMessage[] }>;

  beforeEach(() => {
    // Configuración de TestBed: Se utiliza TestBed.configureTestingModule para configurar el módulo de pruebas y proporcionar el servicio PopupService.
    TestBed.configureTestingModule({
      providers: [PopupService]
    });

    service = TestBed.inject(PopupService);

    // Acceso al BehaviorSubject privado: Se utiliza service['showPopupSubject'] para acceder al BehaviorSubject privado del servicio. Esto es necesario para verificar y manipular el estado interno del servicio durante las pruebas.
    showPopupSubject = service['showPopupSubject']; // Acceder al BehaviorSubject privado
  });

  // Prueba de addErrorMessage: Se prueba que el método addErrorMessage añada correctamente un mensaje de error al estado interno del servicio. Se verifica que el mensaje se agregue correctamente y que el estado refleje el nuevo mensaje.

  it('should add error message', () => {
    const message = 'Test error message';
    const initialMessages = showPopupSubject.value.messages.length;

    service.addErrorMessage(message);

    const updatedMessages = showPopupSubject.value.messages;
    expect(updatedMessages.length).toBe(initialMessages + 1);
    expect(updatedMessages[updatedMessages.length - 1].message).toBe(message);
  });

  it('should remove error message', () => {
    const message = 'Test error message';
    service.addErrorMessage(message);

    const initialMessages = showPopupSubject.value.messages.length;
    const messageIdToRemove = showPopupSubject.value.messages[0].id;

    service.removeErrorMessage(messageIdToRemove);

    const updatedMessages = showPopupSubject.value.messages;
    expect(updatedMessages.length).toBe(initialMessages - 1);
    expect(updatedMessages.some(msg => msg.id === messageIdToRemove)).toBe(false);
  });

  it('should close popup after timeout', () => {
    const message = 'Test error message';
    const timeoutDuration = 31000; // Más de 30 segundos para asegurar que se cierre

    service.addErrorMessage(message);

    // Esperar más tiempo del necesario para que se cierre el mensaje
    setTimeout(() => {
      const updatedMessages = showPopupSubject.value.messages;
      expect(updatedMessages.length).toBe(0);
    }, timeoutDuration);
  });
});
