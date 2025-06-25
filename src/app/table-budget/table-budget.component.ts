import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class TableBudgetComponent implements OnInit, OnChanges {

  currentTurn?: TurnModel;
/*   currentBudget?: number;
 */  gameId!: number

 @Input() updateTrigger!: number; 

  /* createdTurn?: TurnModel;
  createdBudget?: TurnModel; */

  constructor(private turnService: TurnService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const idFromRoute = params['id'];
      if (idFromRoute) {
        this.gameId = +idFromRoute;
        this.getTurns();
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['updateTrigger'] && !changes['updateTrigger'].firstChange) {
        this.getTurns();
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


  //TODO
  /* getTurns(gameId: number): Observable<Response<any[]>> {
    return this.http.get<Response<any[]>>(`${this.getUrlTurn}/${gameId}`);
  }
 */



}
