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

  cardComponents: CompanyModel[] = [];

  constructor(private companyService: CompanyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const gameId = +params['id'];
      if (gameId) {
        this.getCompaniesByGameId(gameId);
      } else {
        console.error('gameId non trovato nella route');
      }
    });
  }


  getCompaniesByGameId(gameId: number) {
    this.companyService.getCompaniesByGameId(gameId).subscribe({
      next: (response) => {
        console.log('response ', response);
      },
      error: (error) => {
        console.error('error ', error);
      }
    })
  }


}
