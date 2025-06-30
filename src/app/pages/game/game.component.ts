import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { MapComponent } from "../../map/map.component";
import { CompanyComponent } from "../../company/company.component";
import { GameModel } from '../../model/Game';
import { GameService } from '../../services/game/game.service';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from "../../employee/employee.component";
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../model/User';
import { create } from 'domain';
import { error } from 'console';
import { TurnService } from '../../services/turn/turn.service';
import { TurnModel } from '../../model/Turn';
import { ActivatedRoute, Params } from '@angular/router';
import { EmployeeService } from '../../services/employee/employee.service';
import { CardComponentComponent } from "../../company/card-component/card-component.component";
import { Response } from '../../Response';
import { TableBudgetComponent } from "../../table-budget/table-budget.component";
import { CompanyModel } from '../../model/Company';


@Component({
  selector: 'app-game',
  imports: [MapComponent, CompanyComponent, CommonModule, EmployeeComponent, CardComponentComponent, TableBudgetComponent, NavbarComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {


  games: GameModel[] = [];
  currentUser: UserModel | null = null;
  gameId: number = 0
  createdTurn?: any;
  turnUpdateTrigger: number = 0;
  budgetUpdateTrigger = 0;

  roleStats: {
    [key: string]: { totali: number; staffati: number; disponibili: number };
  } = {
      Manager: { totali: 0, staffati: 0, disponibili: 0 },
      Senior: { totali: 0, staffati: 0, disponibili: 0 },
      Consultant: { totali: 0, staffati: 0, disponibili: 0 }
    };


  constructor(
    private gameService: GameService,
    private userService: UserService,
    private authService: AuthService,
    private turnService: TurnService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //this.gameService.gameUpdatedSubject.subscribe((gameDto) => {
    //this.games = gameDto ? gameDto.map((dto: GameDTO) => this.mapGameDtoToGameModel(dto)) : [];
    //})

    /* this.currentUser = this.authService.getCurrentUser();

    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });

    this.getGames(); */

    this.route.params.subscribe((params: Params) => {
      const idFromRoute = params['id'];
      if (idFromRoute) {
        this.gameId = +idFromRoute;
        this.employeeService.getEmployeeByGame(this.gameId);
      }
    })

    //leggere il parametro dell'id passato su user component




    /* this.employeeService.getEmployees(); */
  }

   /* getGames(): void {
    this.gameService.getGames().subscribe({
      next: (g) => {
        console.log('response', g)
        this.games = g
      },
      error: (error) => {
        console.error('error: ', error)
        this.games = [];
      }
    })
  }  */

    onBudgetChanged() {
      this.budgetUpdateTrigger++;
      console.log('budget update trigger ', this.budgetUpdateTrigger);
    }

    onRoleStatsUpdated(updatedStats: any) {
      this.roleStats = updatedStats;
    }

  

  newTurn() {

    this.turnService.newTurn(this.gameId).subscribe({
      next: (response) => {
        this.createdTurn = response;
        console.log('response ', response);
        this.turnUpdateTrigger++;
        this.onBudgetChanged();
      },
      error: (error) => {
        console.error('error ', error);
      }
    })
  }




}
