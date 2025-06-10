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

  gameUpdatedSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  getGames(): Observable<Response<GameModel[]>> {
    return this.http.get<Response<GameModel[]>>(this.apiUrl);
  }

}
