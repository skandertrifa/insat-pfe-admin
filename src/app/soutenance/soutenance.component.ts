
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Soutenance, Soutenances } from './models/soutenance';
import { SoutenanceService } from './services/soutenance.service';


@Component({
  selector: 'app-soutenance',
  templateUrl: './soutenance.component.html',
  styleUrls: ['./soutenance.component.css']
})
export class SoutenanceComponent implements OnChanges, OnInit {

  soutenances: Soutenances;
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

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges is trash change my mind")
    
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
