import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Menu } from '../../models/menu.model';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrl: './mainmenu.component.scss'
})
export class MainmenuComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

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
