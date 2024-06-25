// popup.component.ts
import { Component, OnInit } from '@angular/core';
import { PopupService } from '@services/popup.service';

interface PopupMessage {
  id: number;
  message: string;
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  showPopup: boolean = false;
  messages: PopupMessage[] = [];

  constructor(private popupService: PopupService) {}

  ngOnInit(): void {
    this.popupService.showPopup$.subscribe((data: { show: boolean, messages: PopupMessage[] }) => {
      this.showPopup = data.show;
      this.messages = data.messages;
    });
  }

  closePopup(id: number): void {
    this.popupService.removeErrorMessage(id);
  }
}
