import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company/company.service';
import { CompanyModel } from '../../model/Company';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-card-component',
  imports: [CommonModule],
  templateUrl: './card-component.component.html',
  styleUrl: './card-component.component.css'
})
export class CardComponentComponent implements OnInit {

  company?: CompanyModel

  visible: boolean = false;

  constructor(private companyService: CompanyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const companyId = +params['companyId']; // Assumes you have a 'companyId' param in your route
      if (companyId) {
        this.getCompanyById(companyId);
      } else {
        console.error('companyId non trovato nella route');
      }
    });
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  getCompanyById(companyId: number) {
    this.companyService.getCompanyById(companyId).subscribe({
      next: (response) => {
        console.log('response ', response);
        this.company = response;
      },
      error: (error) => {
        console.error('error ', error);
      }
    })
  }


}
