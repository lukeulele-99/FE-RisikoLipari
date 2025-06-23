import { Injectable } from '@angular/core';
import { TurnModel } from '../../model/Turn';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../Response';

@Injectable({
  providedIn: 'root'
})
export class TurnService {

  

  private getUrlTurn = '/api/turn';

  private postUrlTurn = '/api/turn/next';

  constructor(private http: HttpClient) { }

  getTurns(gameId: number): Observable<Response<any[]>> {
    return this.http.get<Response<any[]>>(`${this.getUrlTurn}/${gameId}`);
  }

  newTurn(gameId: number): Observable<Response<any[]>> {
    return this.http.post<Response<any[]>>(`${this.postUrlTurn}/${gameId}`, null);
  }

}
