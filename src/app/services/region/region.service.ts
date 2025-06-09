import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegionDTO } from '../../model/RegionDTO';// path corretto
import { Response } from '../../Response';


@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private apiUrl = 'http://localhost:8080/api/region'; 

  constructor(private http: HttpClient) {}

  getRegions(): Observable<Response<RegionDTO[]>> {
    return this.http.get<Response<RegionDTO[]>>(this.apiUrl);
  }
}
