import { AnneeService } from './../../services/annee.service';
import { Component, OnInit } from '@angular/core';
import { Annee } from '../../models/soutenance';

@Component({
  selector: 'app-creer-annee',
  templateUrl: './creer-annee.component.html',
  styleUrls: ['./creer-annee.component.css']
})
export class CreerAnneeComponent implements OnInit {

  annees : Annee[] = []
  creerAnnee ={annee : ""}

  constructor(private anneeService: AnneeService) { }

  ngOnInit(): void {
    this.anneeService.getAnnees().subscribe(
      (response) => {
        
        this.annees = response;
        
      })
  }
  createAnnee(){
    console.log("l'annee : ",this.creerAnnee)
    this.anneeService.createAnnee(this.creerAnnee).subscribe(
      (response) =>{
        this.anneeService.getAnnees().subscribe(
          (response) => {
            this.annees = response;        
          })
      }

    )
    

  }

}
