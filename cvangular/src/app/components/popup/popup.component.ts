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

  constructor(private popupService: PopupService) {}

  ngOnInit(): void {
    this.popupService.showPopup$.subscribe((show: boolean) => {
      this.showPopup = show;
    });
  }

  closePopup(): void {
    this.popupService.setShowPopup(false);
  }
}
