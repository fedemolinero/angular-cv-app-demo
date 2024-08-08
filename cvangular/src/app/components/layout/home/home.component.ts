import { Component } from '@angular/core';
import { TemplateService } from '@app/services/template.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  color$!: Observable<boolean>;

  constructor(
    private templateService: TemplateService) { }

  ngOnInit(): void {
    this.color$ = this.templateService.color$;
  }

}
