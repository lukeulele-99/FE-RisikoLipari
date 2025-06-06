import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameDTO } from '../../model/GameDTO';
import { Response } from '../../Response';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'http://localhost:8080/api/game';

  gameUpdatedSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  getGames(): Observable<Response<GameDTO[]>> {
    return this.http.get<Response<GameDTO[]>>(this.apiUrl);
  }

}
