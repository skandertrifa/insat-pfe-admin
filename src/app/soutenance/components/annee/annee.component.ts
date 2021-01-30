import { AnneeService } from '../../services/annee.service';
import { Component, OnInit } from '@angular/core';
import { Annee } from '../../models/soutenance';
import { CreateAnnee } from '../../models/create-soutenance';

@Component({
  selector: 'app-annee',
  templateUrl: './annee.component.html',
  styleUrls: ['./annee.component.css']
})
export class AnneeComponent implements OnInit {

  annees : Annee[] = []
  selectedAnnee : Annee
  annee : CreateAnnee={annee : null}

  constructor(private anneeService: AnneeService) { }

  checkExistance(object) : boolean
  {
    for (let feature in object){
      
      if (object[feature] ===null)
        return false
    }
    return true

  }

  loadAnnees(){
    this.anneeService.getAnnees().subscribe(
      (response) => {
        this.annees = response;        
      })
  }


  ngOnInit(): void {
    this.loadAnnees()
  }
  createAnnee(){
    if (!this.checkExistance(this.annee)){
      return ;
    }
    this.anneeService.createAnnee(this.annee).subscribe(
      (response) =>{
        this.loadAnnees()
      }
    )   
  }

  modifyAnnee(){
    console.log("selected : ",this.selectedAnnee)
    const modifyAnnee :Partial<CreateAnnee>={}
    for (let feature in this.annee)
    {
      if (feature !== null)
        modifyAnnee[feature]=this.annee[feature]

    }
    console.log("modifyAnnee : ",modifyAnnee)
    this.anneeService.modifyAnnee(modifyAnnee,this.selectedAnnee.id).subscribe(
      (response) =>{
        this.loadAnnees()
      }
    )   
  }
  
  deleteAnnee(){
    
    this.anneeService.deleteAnnee(this.selectedAnnee.id).subscribe(
      (response) =>{
        this.loadAnnees()
      }
    )   
  }


}
