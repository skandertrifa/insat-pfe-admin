
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {  Soutenances } from 'src/app/soutenance/models/soutenance';
import { SoutenanceService } from 'src/app/soutenance/services/soutenance.service';


@Component({
  selector: 'app-soutenance',
  templateUrl: './afficher-soutenances.component.html',
  styleUrls: ['./afficher-soutenances.component.css']
})
export class AfficherSoutenancesComponent implements  OnInit {

  soutenances: Soutenances=new Soutenances();
  searchString : string = "";
  page: number=1
  constructor(
    private soutenanceService: SoutenanceService
  ) { }


  ngOnInit() {
    this.soutenanceService.getSoutenances(this.page).subscribe(
      (response) => {
        console.log(response);
        this.soutenances = response;
        console.log(this.soutenances);
      })
  }


  setPage(page: number=1){
    this.page=page
    this.soutenanceService.getSoutenances(this.page).subscribe(
      (response) => {
        console.log(response);
        this.soutenances = response;
        console.log(this.soutenances);
      })
    
  }

  

}
