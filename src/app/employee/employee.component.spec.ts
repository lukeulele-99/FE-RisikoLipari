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
export class EmployeeComponent implements OnInit{
  employees : Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
      this.employeeService.getEmployee().subscribe({
        next: (response) => {
        console.log('response', response)
        if (Array.isArray(response) && response.length > 0) {
          this.employees = response;
        } else {
          this.employees = [];
        }
      },
      error : (error) => {
        console.error('Error ', error);
        this.employees = [];
      }
      });
  }
}