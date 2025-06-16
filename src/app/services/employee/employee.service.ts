import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../../Response';
import { Employee } from '../../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private getEmploByGame = 'http://localhost:8080/api/employee/game';

  constructor(private http: HttpClient) { }

  getEmployeeByGame(gameId: number): Observable<Employee[]> { // passare l'id del gameId  /game/gameId
    return this.http.get<Employee[]>(`${this.getEmploByGame}/${gameId}`);
  }
}
