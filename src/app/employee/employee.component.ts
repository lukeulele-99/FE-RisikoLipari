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
