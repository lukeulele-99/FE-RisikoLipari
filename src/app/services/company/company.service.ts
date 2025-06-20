import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from '../../Response';
import { CompanyModel } from '../../model/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private getUrlComp = '/api/company';

  private getUrlCompGame = '/api/company/game';

 // companyUpdatedSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Response<CompanyModel[]>> {
    return this.http.get<Response<CompanyModel[]>>(this.getUrlComp);
  }

  getCompany(id: number): Observable<CompanyModel> {
    return this.http.get<CompanyModel>(`${this.getUrlComp}/${id}`);
  }

  getCompaniesByGameId(gameId: number): Observable<CompanyModel> {
    return this.http.get<CompanyModel>(`${this.getUrlCompGame}/${gameId}`);
  }
}
