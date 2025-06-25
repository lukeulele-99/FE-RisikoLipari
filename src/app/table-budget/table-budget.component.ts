import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TurnService } from '../services/turn/turn.service';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { HttpClient } from '@angular/common/http';
import { TurnModel } from '../model/Turn';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameModel } from '../model/Game';
import { GameService } from '../services/game/game.service';

@Component({
  selector: 'app-table-budget',
  imports: [CommonModule],
  templateUrl: './table-budget.component.html',
  styleUrl: './table-budget.component.css'
})
export class TableBudgetComponent implements OnInit, OnChanges {

  currentTurn?: TurnModel;
  currentBudget?: GameModel;
/*   currentBudget?: number;
 */  gameId!: number

 game: GameModel | null = null;

 @Input() updateTrigger!: number; 

 @Input() updateBudget!: number;

 @Input() budget!: number;

  /* createdTurn?: TurnModel;
  createdBudget?: TurnModel; */

  constructor(private turnService: TurnService, private route: ActivatedRoute, private gameService: GameService) { }


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const idFromRoute = params['id'];
      if (idFromRoute) {
        this.gameId = +idFromRoute;
        this.getTurns();
        this.loadGame(this.gameId);
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['updateTrigger'] && !changes['updateTrigger'].firstChange) {
        this.getTurns();
        this.loadGame(this.gameId);
      }
  }


  getTurns(): void {
    this.turnService.getTurns(this.gameId).subscribe({
      next: (res) => {
        console.log('currentTurn ', res);
        if (Array.isArray(res) && res.length > 0) {
          this.currentTurn = res[res.length - 1];
        } else {
          this.currentTurn = undefined;
        }
      },
      error: (error) => {
        console.error('error ', error);
        this.currentTurn = undefined;
      }
    })
  }

  loadGame(id: number): void {
    this.gameService.getGameById(id).subscribe({
      next: (g) => {
        this.game = g;
        this.budget = g.budget;
        console.log('game caricato ', g);
      },
      error: (err) => {
        console.error('errore caricamento game ', err);
      }
    })
  }

  


  //TODO
  /* getTurns(gameId: number): Observable<Response<any[]>> {
    return this.http.get<Response<any[]>>(`${this.getUrlTurn}/${gameId}`);
  }
 */



}
