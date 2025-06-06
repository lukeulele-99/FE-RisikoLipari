import { Component } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { MapComponent } from "../../map/map.component";
import { CompanyComponent } from "../../company/company.component";
import { GameModel } from '../../model/Game';
import { GameService } from '../../services/game/game.service';
import { GameDTO } from '../../model/GameDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  imports: [NavbarComponent, MapComponent, CompanyComponent, CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  games: GameModel[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.gameUpdatedSubject.subscribe((gameDto) => {
      this.games = gameDto ? gameDto.map((dto: GameDTO) => this.mapGameDtoToGameModel(dto)) : [];
    })

    this.gameService.getGames().subscribe({
      next: (response) => {
        console.log('response', response)
        if (Array.isArray(response) && response.length > 0) {
          this.games = response.map(dto => this.mapGameDtoToGameModel(dto));
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

  

  private mapGameDtoToGameModel(dto: GameDTO): GameModel {
      return {
        id: dto.gameId,
        score: dto.score,
        status: dto.status,
        id_user: dto.id_user
      };
    }
}
