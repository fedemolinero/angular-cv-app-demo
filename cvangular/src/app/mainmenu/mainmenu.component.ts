import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Menu } from '../models/menu.model';

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

  menuGroup: Menu[] = [
    {
      id: 1, 
      name: 'ONE',
      link: ''
    },
    {
      id: 2, 
      name: 'TWO',
      link: ''
    },
    {
      id: 3, 
      name: 'LOGOUT',
      link: 'logout()'
    }
  ];

  goHome() {
    this.router.navigate(['']);
  }

  logout() {
    this.authService.logout();
  }

}
