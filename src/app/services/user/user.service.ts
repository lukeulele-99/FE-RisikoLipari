import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from '../../Response';
import { UserModel } from '../../model/User';
import { GameModel } from '../../model/Game';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getUrlUsers = 'http://localhost:8080/api/users';

  private postUrlUsers = 'http://localhost:8080/api/users/new';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  usersUpdatedSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Response<UserModel[]>> {
    return this.http.get<Response<UserModel[]>>(this.getUrlUsers);
  }

  addUser(UserModel: UserModel): Observable<Response<UserModel[]>> {
    return this.http.post<Response<UserModel[]>>(this.postUrlUsers, UserModel, this.httpOptions)
  }

  

}
