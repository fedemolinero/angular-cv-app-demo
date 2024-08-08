import { Component, OnInit } from '@angular/core';
import { TemplateService } from '@services/template.service';
import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'cvangular';
  isButtonActive = true;
  isAuthenticated$!: Observable<boolean>;

  constructor(
    private templateService: TemplateService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.isAuthenticated$ = this.authService.isAuthenticatedUser$;

    this.templateService.color$
      .subscribe(state => {
        (state == 'active') ? this.isButtonActive = true : this.isButtonActive = false;
      });

  }

}
