import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../../Response';
import { Employee } from '../../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private getEmplo = 'http://localhost:8080/api/employee';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Response<Employee[]>> { // passare l'id del gameId  /game/gameId
    return this.http.get<Response<Employee[]>>(this.getEmplo);
  }
}
