import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { EmployeeService } from './employee.service';
import { Response } from '../../Response';
import { Employee } from '../../model/Employee';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpClientMock: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    // Creo il mock di HttpClient
    httpClientMock = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        EmployeeService,
        { provide: HttpClient, useValue: httpClientMock }
      ]
    });
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getEmployee and return observable', () => {
    // Mock UserModel
    const mockUserModel = {
      id: 1,
      username: 'Luca'
    };

    // Mock GameModel
    const mockGameModel = {
      id: 1,
      score: 100,
      status: 'active',
      id_user: mockUserModel
    };

    // Mock Response con struttura corretta
    const mockResponse: Response<Employee[]> = {
      success: true,
      error: '',
      data: [
        {
          id: 1,
          role: 'Manager' as const,
          total: 10,
          occupied: 5,
          available: 5,
          id_game: mockGameModel
        }
      ]
    };

    // Configuro il mock per restituire la risposta
    httpClientMock.get.and.returnValue(of(mockResponse));

    // Testo il metodo
    service.getEmployee().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    // Verifico che sia stata chiamata l'URL corretta
    expect(httpClientMock.get).toHaveBeenCalledWith('http://localhost:8080/api/employee');
  });
});