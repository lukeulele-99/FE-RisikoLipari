import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../model/Employee';
import { EmployeeService } from '../services/employee/employee.service';
import { ActivatedRoute, Params } from '@angular/router';
import { GameService } from '../services/game/game.service';
import { CompanyService } from '../services/company/company.service';

@Component({
  selector: 'app-employee',
  imports: [CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  currentGameId!: number;
  isHiring = false;
  @Input() budgetChanged = new EventEmitter<void>();
  @Output() roleStatsChanged = new EventEmitter<any>();
  roleStats: {
    [key: string]: { totali: number; staffati: number; disponibili: number }
  } = {
      Manager: { totali: 0, staffati: 0, disponibili: 0 },
      Senior: { totali: 0, staffati: 0, disponibili: 0 },
      Consultant: { totali: 0, staffati: 0, disponibili: 0 }
    };
  objectKeys = Object.keys;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private gameService: GameService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const gameId = +params['id'];
      if (gameId) {
        this.currentGameId = gameId;
        this.getEmployeesByGame(gameId);
      } else {
        console.error('gameId non trovato nella route');
      }
    });

    this.companyService.newCollaborationSubject.subscribe({
      next: (company) => {
        if (company != null) {
          this.roleStats['Manager'].staffati += company.manager;
          this.roleStats['Senior'].staffati += company.senior;
          this.roleStats['Consultant'].staffati += company.consultant;
          this.roleStats['Manager'].disponibili -= company.manager;
          this.roleStats['Senior'].disponibili -= company.senior;
          this.roleStats['Consultant'].disponibili -= company.consultant;
        }

      }
    })
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



  calculateRoleStats() {
    Object.keys(this.roleStats).forEach(role => {
      this.roleStats[role].totali = 0;
      this.roleStats[role].staffati = 0;
      this.roleStats[role].disponibili = 0;
    });

    this.employees.forEach(emp => {
      const role = emp.role;

      if (this.roleStats[role]) {
        this.roleStats[role].totali++;

        if (emp.companyId != null && emp.companyId > 0) {
          this.roleStats[role].staffati++;
        } else {
          this.roleStats[role].disponibili++;
        }
      }
    })

    this.roleStatsChanged.emit(this.roleStats);
  }

  hireEmployees(role: string, gameId: number) {
    if (!this.currentGameId || this.isHiring) return;

    this.isHiring = true;

    this.employeeService.hireEmployees(role, gameId).subscribe({
      next: (response) => {
        console.log('assunzione completata ', response);
        // After hiring, refresh the employee list to reflect changes
        this.getEmployeesByGame(gameId);
        this.budgetChanged.emit();
      },
      error: (err) => {
        console.error('errore assunzione ', err);
      },
      complete: () => {
        this.isHiring = false;
      }
    });
  }
}
