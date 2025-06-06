import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from '../../Response';
import { UserModel } from '../../model/User';
import { UserDTO } from '../../model/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users';

  usersUpdatedSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Response<UserDTO[]>> {
    return this.http.get<Response<UserDTO[]>>(this.apiUrl);
  }

  
}
