import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    constructor(
      private router: Router,
      private authService: AuthService
    ) {}


    isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  //Route per i bottoni richiamati nel btn con eventClick
  goRules(): void {
    this.router.navigate(['/rules']);
  }

  goTutorial(): void {
    this.router.navigate(['/tutorial']);
  }

  goUser(): void {
    if(this.authService.isLoggedIn()) {
      
    }
    this.router.navigate(['/user']);
  }

   goGame(): void {
    this.router.navigate(['/game']);
  }

  goEmployes(): void {
    this.router.navigate(['/employee']);
  }
}

 
