import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from '../../Response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl= 'http://localhost:8080/api/users';

  usersUpdatedSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }
}
