
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {  Soutenances } from 'src/app/soutenance/models/soutenance';
import { SoutenanceService } from 'src/app/soutenance/services/soutenance.service';


@Component({
  selector: 'app-afficher-soutenance',
  templateUrl: './afficher-soutenances.component.html',
  styleUrls: ['./afficher-soutenances.component.css']
})
export class AfficherSoutenancesComponent implements  OnInit {

  soutenances: Soutenances=new Soutenances();
  searchString : string = "";
  page: number=1
  constructor(
    private soutenanceService: SoutenanceService,
    private toastrService: ToastrService
  ) { }

  loadsoutenances(){
    this.soutenanceService.getSoutenances(this.page).subscribe(
      (response) => {
        
        this.soutenances = response;
        
      })
  }
  ngOnInit() {
    this.loadsoutenances()
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
  deleteSoutenance(id : number){
    
    this.soutenanceService.deleteSoutenance(id).subscribe(
      (response) =>{
        this.loadsoutenances()
        this.toastrService.success("La soutenance est Supprimée avec succès");
        
      },
      (erreur) => {
        this.toastrService.error("Erreur");
        
      }
    )
       
  }

  

  

}
