import { Component, OnInit } from '@angular/core';
import { CompanyModel } from '../model/Company';
import { CompanyService } from '../services/company/company.service';
import { CommonModule } from '@angular/common';
import { CardComponentComponent } from "./card-component/card-component.component";


@Component({
  selector: 'app-company',
  imports: [CommonModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit{
  compa: CompanyModel[] = [];

  constructor(private companyService: CompanyService) {}
  ngOnInit(): void {
    
  }


  getCompaniesByGameId() {
    
  }

  /* getCompanies(): void {
   // this.companyService.companyUpdatedSubject.subscribe((companyDto) => {
    //  this.compa = companyDto ? companyDto.map((dto: CompanyDTO) => this.mapCompanyDtoToCompanyModel(dto)) : [];
   // });


   // GET DELLE COMPANIES CON SUBSCRIBE 
    this.companyService.getCompanies().subscribe({
      next: (response) => {
        console.log('response ', response);
        if(Array.isArray(response) && response.length > 0) {
          this.compa = response;
        } else {
          this.compa = [];
        }
      },
      error: (error) => {
        console.error('error: ', error);
        this.compa = [];
      }
    })
  } */

 
}
