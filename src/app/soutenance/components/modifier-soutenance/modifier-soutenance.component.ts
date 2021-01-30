import { Component, OnInit } from '@angular/core';
import { Soutenance } from 'src/app/soutenance/models/soutenance';
import { SoutenanceService } from 'src/app/soutenance/services/soutenance.service';

@Component({
  selector: 'app-modifier-soutenance',
  templateUrl: './modifier-soutenance.component.html',
  styleUrls: ['./modifier-soutenance.component.css']
})
export class ModifierSoutenanceComponent implements OnInit {

  soutenance: Soutenance;
  
  constructor(
    private soutenanceService: SoutenanceService
  ) { }


  ngOnInit() {
    /*this.soutenanceService.getSoutenances(this.page).subscribe(
      (response) => {
        console.log(response);
        this.soutenances = response;
        console.log(this.soutenances);
      })*/
  }


}
