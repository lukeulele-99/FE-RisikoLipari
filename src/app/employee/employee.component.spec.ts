import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/Employee';
import { EmployeeService } from '../services/employee/employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,  // AGGIUNTO STANDALONE
  imports: [CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
isHiring: any;
  hireEmployees(arg0: string, arg1: any) {
    throw new Error('Method not implemented.');
  }
  employees: Employee[] = [];
  roleStats: any;
  currentGameId: any;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployeeByGame(this.currentGameId).subscribe({
      next: (response) => {
        console.log('response', response)
        if (Array.isArray(response) && response.length > 0) {
          this.employees = response;
        } else {
          this.employees = [];
        }
      },
      error: (error) => {
        console.error('Error ', error);
        this.employees = [];
      }
    });
  }
}