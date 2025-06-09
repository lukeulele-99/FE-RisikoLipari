import { Component } from '@angular/core';
import { CompanyModel } from '../model/Company';
import { CompanyService } from '../services/company/company.service';
import { CompanyDTO } from '../model/CompanyDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company',
  imports: [CommonModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {
  compa: CompanyModel[] = [];

  constructor(private companyService: CompanyService) {}

  getCompanies(): void {
    this.companyService.companyUpdatedSubject.subscribe((companyDto) => {
      this.compa = companyDto ? companyDto.map((dto: CompanyDTO) => this.mapCompanyDtoToCompanyModel(dto)) : [];
    });

    this.companyService.getCompanies().subscribe({
      next: (response) => {
        console.log('response ', response);
        if(Array.isArray(response) && response.length > 0) {
          this.compa = response.map(dto => this.mapCompanyDtoToCompanyModel(dto));
        } else {
          this.compa = [];
        }
      },
      error: (error) => {
        console.error('error: ', error);
        this.compa = [];
      }
    })
  }

  private mapCompanyDtoToCompanyModel(dto: CompanyDTO): CompanyModel {
      return {
        id: dto.id ?? 0,
        id_region: dto.id_region,
        name: dto.name,
        status: dto.status
      };
    }
}
