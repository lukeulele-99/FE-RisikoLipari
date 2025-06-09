import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private postUrl = 'http://localhost:8080/api/users/new';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  usersUpdatedSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Response<UserDTO[]>> {
    return this.http.get<Response<UserDTO[]>>(this.apiUrl);
  }

  addUser(userDTO: UserDTO): Observable<Response<UserDTO[]>> {
    return this.http.post<Response<UserDTO[]>>(this.postUrl, userDTO, this.httpOptions)
  }


}
