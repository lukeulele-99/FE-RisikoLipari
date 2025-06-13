import { Component } from '@angular/core';
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

@Component({
  selector: 'app-game',
  imports: [MapComponent, CompanyComponent, CommonModule, EmployeeComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {


  games: GameModel[] = [];
  currentUser: UserModel | null = null;
  turns: TurnModel[] = [];
  gameId = 1;

  constructor(
    private gameService: GameService, 
    private userService: UserService, 
    private authService: AuthService,
    private turnService: TurnService
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

    this.getTurns();
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
        if(Array.isArray(response) && response.length > 0) {
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
        console.log('response ', response);
      },
      error: (error) => {
        console.error('error ', error);
      }
    })
  }




}
