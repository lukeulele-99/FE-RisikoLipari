import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from '../../Response';
import { GameModel } from '../../model/Game';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = '/api/game';

  private createUrlGame = '/api/game'

  gameUpdatedSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private authService: AuthService) { }

  getGames(): Observable<GameModel[]> {
    return this.http.get<GameModel[]>(this.apiUrl);
  }

  getGameById(id: number): Observable<GameModel> {
    return this.http.get<GameModel>(`${this.apiUrl}/${id}`)
  }

  createGame(): Observable<GameModel> {
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser || !currentUser.id) {
      throw new Error('Nessun utente trovato');
    }

    const newGame: any = {
      username: currentUser.username
    }

    return this.http.post<GameModel>(this.createUrlGame, newGame);
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
