import { AnneeService } from 'src/app/soutenance/services/annee.service';
import { Annee } from 'src/app/soutenance/models/soutenance';
import { Component, OnInit } from '@angular/core';
import { Soutenance } from 'src/app/soutenance/models/soutenance';
import { SoutenanceService } from 'src/app/soutenance/services/soutenance.service';

@Component({
  selector: 'app-creer-soutenance',
  templateUrl: './creer-soutenance.component.html',
  styleUrls: ['./creer-soutenance.component.css']
})
export class CreerSoutenanceComponent implements OnInit {

  soutenance: Soutenance=null;
  
  
  constructor(
    private soutenanceService: SoutenanceService,
    private anneeService: AnneeService
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
