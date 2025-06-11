import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from '../../Response';
import { GameModel } from '../../model/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'http://localhost:8080/api/game';

  private createUrlGame = 'http://localhost:8080/api/game'

  gameUpdatedSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  getGames(): Observable<Response<GameModel[]>> {
    return this.http.get<Response<GameModel[]>>(this.apiUrl);
  }

   /*createGame(id_user: number): Observable<Response<GameModel[]>> {
    const newGame: GameModel = {
      id: 0,
      id_user: { id: id_user } as any, // Replace 'as any' with the actual UserModel structure if needed
      score: 0,
      status: 'On going'
    }
    return this.http.post<Response<GameModel[]>>(this.createUrlGame, newGame);
  } */

  getCurrentUser(): Observable<Response<GameModel[]>> {
    return this.http.get<Response<GameModel[]>>(this.apiUrl);
  }

}
