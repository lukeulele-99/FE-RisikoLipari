import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from '../../Response';
import { CompanyModel } from '../../model/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private getUrlComp = 'http://localhost:8080/api/company';

 // companyUpdatedSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Response<CompanyModel[]>> {
    return this.http.get<Response<CompanyModel[]>>(this.getUrlComp);
  }

  getCompanyById(id: number): Observable<CompanyModel> {
    return this.http.get<CompanyModel>(`${this.getUrlComp}/${id}`);
  }
}
