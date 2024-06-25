import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { delay, of } from 'rxjs';
import { PopupService } from './services/popup.service';
import { TemplateService } from './services/template.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'cvangular';
  isButtonActive = true;

  constructor(
    private templateService: TemplateService,
  ) { }

  ngOnInit(): void {
    this.templateService.color$
      .subscribe(state => {
        (state == 'active') ? this.isButtonActive = true : this.isButtonActive = false;
      });
  }

}
