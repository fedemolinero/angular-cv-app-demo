import { Component } from '@angular/core';
import { delay, of } from 'rxjs';
import { PopupService } from './services/popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cvangular';

  constructor(
    // private popupService: PopupService

  ) {
    // Simula una respuesta falsa del observable
    // of(false).pipe(delay(2000)).subscribe((response: boolean) => {
    //   if (!response) {
    //     this.popupService.setShowPopup(true);
    //   }
    // });
  }

}
