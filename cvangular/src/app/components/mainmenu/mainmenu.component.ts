import { Component, Input, input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrl: './mainmenu.component.scss'
})
export class MainmenuComponent {

  @Input() isAuthenticated!: boolean | null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  goHome() {
    this.router.navigate(['']);
  }

  goRegister() {
    this.router.navigate(['register']);
  }

  goLogin() {
    this.router.navigate(['login']);
  }

  goLayout() {
    this.router.navigate(['layout']);
  }

  goLogout() {
    this.authService.logout();
  }

}
