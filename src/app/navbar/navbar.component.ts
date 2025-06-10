import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    constructor(private router: Router) {}

  //Route per i bottoni richiamati nel btn con eventClick
  goRules(): void {
    this.router.navigate(['/rules']);
  }

  goTutorial(): void {
    this.router.navigate(['/tutorial']);
  }

  goUser(): void {
    this.router.navigate(['/user']);
  }
}


