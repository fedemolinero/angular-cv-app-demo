// popup.component.ts
import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  showPopup: boolean = false;
  message: string = '';

  constructor(private popupService: PopupService) {}

  ngOnInit(): void {
    this.popupService.showPopup$.subscribe((data: { show: boolean, message: string }) => {
      this.showPopup = data.show;
      this.message = data.message;
    });
  }

  closePopup(): void {
    this.popupService.setShowPopup(false);
  }
}
