import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrl: './mainmenu.component.scss'
})
export class MainmenuComponent {

  constructor(
    private router: Router
  ) { }

  categories: string[] = ['ONE', 'TWO', 'TRES'];

  goHome() {
    this.router.navigate(['']);
  }

}
