import { Component, OnInit } from '@angular/core';
import { RegionService } from '../services/region/region.service';
import { RegionDTO } from '../model/RegionDTO';
import { Response } from '../Response';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  regions: RegionDTO[] = [];

  constructor(private regionService: RegionService) {}

  ngOnInit(): void {
    this.regionService.getRegions().subscribe({
      next: (res) => {
        this.regions = res.data;
        console.log('Regioni:', this.regions);
      },
      error: (err) => {
        console.error('Errore nel recupero delle regioni:', err);
      }
    });
  }
}
