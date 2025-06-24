import { Component } from '@angular/core';
import { TurnService } from '../services/turn/turn.service';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { HttpClient } from '@angular/common/http';
import { TurnModel } from '../model/Turn';

@Component({
  selector: 'app-table-budget',
  imports: [],
  templateUrl: './table-budget.component.html',
  styleUrl: './table-budget.component.css'
})
export class TableBudgetComponent {
  private getUrlTurn = 'http://localhost:8080/api/turn';
  constructor(private turnService: TurnService) { }
  createdTurn?: TurnModel;
  createdBudget?: TurnModel;
  




  //TODO
  /* getTurns(gameId: number): Observable<Response<any[]>> {
    return this.http.get<Response<any[]>>(`${this.getUrlTurn}/${gameId}`);
  }
 */



}
