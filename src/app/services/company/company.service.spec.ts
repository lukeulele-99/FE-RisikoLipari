import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { CompanyService } from './company.service';
import { Response } from '../../Response';
import { CompanyModel } from '../../model/Company';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    // Crea uno spy per HttpClient con i metodi che usi
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        CompanyService,
        { provide: HttpClient, useValue: spy }
      ]
    });
    
    service = TestBed.inject(CompanyService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get companies', () => {
    const mockResponse: Response<CompanyModel[]> = {
      success: true,
      error: '',
      data: [
        {
          id: 1,
          id_region: 1,
          name: 'Test Company',
          status: 'disponibile'
        }
      ]
    };

    httpClientSpy.get.and.returnValue(of(mockResponse));

    service.getCompanies().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith('http://localhost:8080/api/company');
  });

  it('should get company by id', () => {
    const mockCompany: CompanyModel = {
      id: 1,
      id_region: 1,
      name: 'Test Company',
      status: 'disponibile'
    };

    httpClientSpy.get.and.returnValue(of(mockCompany));

    service.getCompanyById(1).subscribe(company => {
      expect(company).toEqual(mockCompany);
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith('http://localhost:8080/api/company/1');
  });
});