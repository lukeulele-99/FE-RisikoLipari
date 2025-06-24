import { Component, OnInit } from '@angular/core';
import { TurnService } from '../services/turn/turn.service';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { HttpClient } from '@angular/common/http';
import { TurnModel } from '../model/Turn';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-budget',
  imports: [CommonModule],
  templateUrl: './table-budget.component.html',
  styleUrl: './table-budget.component.css'
})
export class TableBudgetComponent implements OnInit{

  currentTurn!: number
  gameId!: number
  
  /* createdTurn?: TurnModel;
  createdBudget?: TurnModel; */

  constructor(private turnService: TurnService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const idFromRoute = params['id'];
      if (idFromRoute) {
        this.gameId = +idFromRoute;
        this.getTurns(this.gameId);
      }
    })
  }
  

  getTurns(gameId: number): void {
    this.turnService.getTurns(gameId).subscribe({
      next: (res) => {
        console.log('turno corrente ', res);
      },
      error: (err) => {
        console.error('errore nel turno corrente ', err);
      }
    })
  }


  //TODO
  /* getTurns(gameId: number): Observable<Response<any[]>> {
    return this.http.get<Response<any[]>>(`${this.getUrlTurn}/${gameId}`);
  }
 */



}
