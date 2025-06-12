//AUTHEENTICAION SERVICE CON LOGIN E LOGOUT 

import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../model/User';
import { UserService } from './user/user.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {




  private currentUserSubject = new BehaviorSubject<UserModel | null>(null);

  currentUser: UserModel | undefined

  constructor(private userService: UserService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.initializeFromStorage();
  }

  private initializeFromStorage(): void {
    // Only run this in browser environments
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          this.currentUserSubject.next(user);
          this.currentUser = user;
        } catch (e) {
          console.error('Error parsing current user ', e);
          this.logout();
        }
      }
    }
  }

  getCurrentUser(): UserModel | undefined {
    return this.currentUser
  }

  /* get currentUserValue(): UserModel | null {
    return this.currentUserSubject.value;
  } */

  get currentUserId(): number | null {
    return this.currentUser?.id || null;
  }

  login(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.currentUser = user;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }


  /* getCurrentUser(): UserModel | null {
    return this.currentUserSubject.value;
  } */



  /* login(): void {
     localStorage.setItem('auth', 'true');
   }
 
   logout(): void {
     localStorage.removeItem('auth');
   }
 
   isLoggedIn(): boolean {
     return localStorage.getItem('auth') === 'true';
   } */
} 