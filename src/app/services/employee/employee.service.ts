import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../../Response';
import { Employee } from '../../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private getEmploByGame = '/api/employee/game';

  private postEmploHire = '/api/employee/hire';

  constructor(private http: HttpClient) { }

  getEmployeeByGame(gameId: number): Observable<Employee[]> { // passare l'id del gameId  /game/gameId
    return this.http.get<Employee[]>(`${this.getEmploByGame}/${gameId}`);
  }

  hireEmployees(role: string, gameId: number): Observable<Employee> {
    const body = { role, gameId };
    return this.http.post<Employee>(this.postEmploHire, body);
  }
}
