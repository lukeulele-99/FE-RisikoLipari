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


@Component({
  selector: 'app-game',
  imports: [MapComponent, CompanyComponent, CommonModule, EmployeeComponent, CardComponentComponent, TableBudgetComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {


  games: GameModel[] = [];
  currentUser: UserModel | null = null;
  turns: TurnModel[] = [];
  gameId : number = 0
  createdTurn?: any;


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
      if(idFromRoute) {
        this.gameId = +idFromRoute;
        this.getTurns();
        this.employeeService.getEmployeeByGame(this.gameId);
      } 
    })

    //leggere il parametro dell'id passato su user component
 
    


    /* this.employeeService.getEmployees(); */
  }

  getGames(): void {
    this.gameService.getGames().subscribe({
      next: (response) => {
        console.log('response', response)
        if (Array.isArray(response) && response.length > 0) {
          this.games = response;
        } else {
          this.games = [];
        }
      },
      error: (error) => {
        console.error('error: ', error)
        this.games = [];
      }
    })
  }

  getTurns(): void {
    this.turnService.getTurns(this.gameId).subscribe({
      next: (response) => {
        console.log('response ', response);
        if (Array.isArray(response) && response.length > 0) {
          this.turns = response;
        } else {
          this.turns = [];
        }
      },
      error: (error) => {
        console.error('error ', error);
        this.turns = [];
      }
    })
  }

  newTurn() {

    this.turnService.newTurn(this.gameId).subscribe({
      next: (response) => {
        this.createdTurn = response;
        console.log('response ', response);
      },
      error: (error) => {
        console.error('error ', error);
      }
    })
  }




}
