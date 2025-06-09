import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CompanyDTO } from '../../model/CompanyDTO';
import { Response } from '../../Response';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private getUrlComp = 'http://localhost:8080/api/company/';

  companyUpdatedSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Response<CompanyDTO[]>> {
    return this.http.get<Response<CompanyDTO[]>>(this.getUrlComp);
  }
}
