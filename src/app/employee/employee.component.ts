import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/Employee';
import { EmployeeService } from '../services/employee/employee.service';
import { ActivatedRoute, Params } from '@angular/router';
import { GameService } from '../services/game/game.service';

@Component({
  selector: 'app-employee',
  imports: [CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  roleStats: {
    [key: string]: { totali: number; staffati: number; disponibili: number }
  } = {
      Manager: { totali: 0, staffati: 0, disponibili: 0 },
      Senior: { totali: 0, staffati: 0, disponibili: 0 },
      Consultant: { totali: 0, staffati: 0, disponibili: 0 }
    };
  objectKeys = Object.keys;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const gameId = +params['id'];
      if (gameId) {
        this.getEmployeesByGame(gameId);
      } else {
        console.error('gameId non trovato nella route');
      }
    });
  }

  getEmployeesByGame(gameId: number): void {
    this.employeeService.getEmployeeByGame(gameId).subscribe({
      next: (response) => {
        console.log('response', response)
        if (Array.isArray(response) && response.length > 0) {
          this.employees = response;
          this.calculateRoleStats();
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

  resetStats() {
    this.roleStats = {
      Manager: { totali: 3, staffati: 1, disponibili: 2 },
      Senior: { totali: 5, staffati: 2, disponibili: 3 },
      Consultant: { totali: 10, staffati: 5, disponibili: 5 }
    };
  }

  calculateRoleStats() {
    //this.resetStats();

    this.employees.forEach(emp => {
      const role = emp.role;

      if(this.roleStats[role]) {
        this.roleStats[role].totali++;

        if(emp.companyId != null && emp.companyId > 0) {
          this.roleStats[role].staffati++;
        } else {
          this.roleStats[role].disponibili++;
        }
      }
    })
  }
}
