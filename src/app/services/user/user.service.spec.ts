import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('UserService with manual HttpClient mock', () => {
  let service: UserService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    // crea un finto HttpClient con solo il metodo .get()
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: HttpClient, useValue: httpClientSpy },
      ]
    });

    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call HttpClient.get', () => {
    const expectedData = {
      success: true,
      error: "",
      data: [{
        id: 1,
        username: "Luca"
      }]
    }
    httpClientSpy.get.and.returnValue(of(expectedData)); // restituisce un Observable

    service.getUsers().subscribe(data => {
      expect(data).toEqual(expectedData);
    });

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
});
