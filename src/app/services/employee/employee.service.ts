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

  getEmployee(): Observable<Response<Employee[]>> {
    return this.http.get<Response<Employee[]>>(this.getEmplo);
  }
}
