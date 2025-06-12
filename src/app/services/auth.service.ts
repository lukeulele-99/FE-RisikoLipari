//AUTHEENTICAION SERVICE CON LOGIN E LOGOUT 

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../model/User';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {




  private currentUserSubject = new BehaviorSubject<UserModel | null>(null);

  currentUser: UserModel | undefined

  constructor(private userService: UserService) {
    this.initializeFromStorage();
  }

  initializeFromStorage(): void {
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