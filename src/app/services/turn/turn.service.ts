import { Injectable } from '@angular/core';
import { TurnModel } from '../../model/Turn';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../Response';

@Injectable({
  providedIn: 'root'
})
export class TurnService {

  turn: TurnModel[] = [];

  private getUrlTurn = 'http://localhost:8080/api/turn';

  constructor(private http: HttpClient) { }

  getTurns(gameId: number): Observable<Response<any[]>> {
    return this.http.get<Response<any[]>>(`${this.getUrlTurn}/${gameId}`);
  }

}
